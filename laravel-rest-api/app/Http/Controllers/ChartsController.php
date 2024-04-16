<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ChartsController extends Controller
{




    public function CitiesChart(Request $request)
    {

        // Return the data for rendering the chart
        return response()->json([
            'labels' => ['safi', 'marrakech', "casa", "rabat"],
            'data' => [2, 20, 17, 10]
        ]);
    }




    public function patientsChart(Request $request)
    {
        $timeframe = $request->input('timeframe', 'last30days');

        $patients = null;

        if ($timeframe === 'last30days') {
            $startDate = now()->subDays(30)->startOfDay();
            $endDate = now()->endOfDay();
        } elseif ($timeframe === 'lastWeek') {
            $startDate = now()->subDays(7)->startOfDay();
            $endDate = now()->endOfDay();
        } elseif ($timeframe === 'last90days') {
            $startDate = now()->subDays(90)->startOfDay();
            $endDate = now()->endOfDay();
        } elseif ($timeframe === 'allTime') {
            $startDate = Patient::orderBy('created_at')->first()->created_at->startOfDay();
            $endDate = now()->endOfDay();
        }

        // Generate all days within the selected timeframe
        $allDays = [];
        $currentDate = clone $startDate;
        while ($currentDate <= $endDate) {
            $allDays[$currentDate->toDateString()] = 0;
            $currentDate->addDay();
        }

        // fsetch patient data for the selected timeframe
        $patients = Patient::whereBetween('created_at', [$startDate, $endDate])->get();

        // Process data to count patients created each day
        $patientCountByDay = $this->processPatientData($patients);

        // Merge patient counts with all days to ensure all days are present in the response
        $completeData = array_merge($allDays, $patientCountByDay);

        // Return the data for rendering the chart
        return response()->json([
            'labels' => array_keys($completeData),
            'data' => array_values($completeData)
        ]);
    }

    private function processPatientData($patients)
    {
        $patientCountByDay = [];

        foreach ($patients as $patient) {
            $date = Carbon::parse($patient->created_at)->toDateString();
            if (!isset($patientCountByDay[$date])) {
                $patientCountByDay[$date] = 0;
            }
            $patientCountByDay[$date]++;
        }

        return $patientCountByDay;
    }
}

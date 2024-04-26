<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{

    protected $fillable = [
        "patient_id", "responsable_id", "description", "file_url"
    ];
    use HasFactory;


    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
    public function responsable() // user in association who's create timeline
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }
}

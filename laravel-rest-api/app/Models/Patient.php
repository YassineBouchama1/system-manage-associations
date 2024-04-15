<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [

        'association_id', // Fdsoreign key for association
        'first_name',
        'last_name',
        'city',
        'avatar',
        'current_address',
        'birth_address',
        'phone',
        'status',
        'date_of_birth',
    ];


    public function association()
    {
        return $this->belongsTo(Association::class, 'association_id');
    }
}

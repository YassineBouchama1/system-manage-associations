<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Association extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = ['name', 'address', 'logo', 'status', 'city', 'illness_id'];

    public function users()
    {
        return $this->hasMany(User::class,);
    }
    public function illnesse()
    {
        return $this->belongsTo(Illness::class);
    }
    public function patients()
    {
        return $this->hasMany(Patient::class,);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Association extends Model
{
    use HasFactory;


    protected $fillable = ['name', 'address', 'logo', 'status', 'city', 'illness_id'];

    public function user()
    {
        return $this->hasMany(User::class,);
    }
    public function illnesse()
    {
        return $this->belongsTo(Illness::class);
    }
}

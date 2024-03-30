<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Illness extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function associations()
    {
        return $this->hasMany(Association::class);
    }
}

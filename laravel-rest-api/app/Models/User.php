<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;


    protected $fillable = [
        'name', 'email', 'password', 'role_id', 'association_id', 'profile_photo', 'contact_info', 'status', 'email_verified_at', 'last_online_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
        'last_online_at' => 'datetime',

    ];

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function association()
    {
        return $this->belongsTo(Association::class, 'association_id');
    }


    //add attrubute role_name to user
    public function getRoleNameAttribute()
    {
        return optional($this->role)->name;
    }

    public function timeLines()
    {
        return $this->hasMany(Timeline::class,);
    }
}

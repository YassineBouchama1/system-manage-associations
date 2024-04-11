<?php

namespace App\Policies;

use App\Models\Illness;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class IllnessPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any illnesses.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasRole('admin');
    }

    // Define methods for other actions (optional)
    public function view(User $user, Illness $illness)
    {
        // ... (logic for viewing specific illnesses)
        return true;
    }

    public function create(User $user)
    {
        // ... (logic for creating illnesses)
        return true;
    }

    public function update(User $user, Illness $illness)
    {
        // ... (logic for updating illnesses)
        return true;
    }

    public function delete(User $user)
    {
        // ... (logic for deleting illnesses)

        //should be admin
        return $user->role_id === 1;
    }
}

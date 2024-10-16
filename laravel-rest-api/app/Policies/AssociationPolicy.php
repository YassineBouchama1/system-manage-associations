<?php

namespace App\Policies;

use App\Models\Association;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class AssociationPolicy
{

    use HandlesAuthorization;
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //

    }

    /**
     * Determine whether the user can view any illnesses.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        // should be super admin
        return $user->role_id === 1 || $user->role_id === 2;
    }

    // Define methods for other actions (optional)
    public function view(User $user, Association $association)
    {
        // ... (logic for viewing specific illnesses)
        return $user->role_id === 1 || ($user->role_id === 2 && $user->association_id === $association->id);
    }

    public function create(User $user,)
    {

        // ... (logic for creating illnesses)
        return $user->role_id === 1 || $user->role_id === 2;
    }

    public function update(User $user, Association $association)
    {


        // ... (logic for updating illnesses)
        return $user->role_id === 1 || ($user->role_id === 2 && $user->association_id === $association->id);
    }

    public function delete(User $user, Association $association)
    {

        // ... (logic for deleting illnesses)
        return $user->role_id === 1 || ($user->role_id === 2 && $user->association_id === $association->id);
    }
}

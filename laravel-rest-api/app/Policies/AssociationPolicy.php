<?php

namespace App\Policies;

use App\Models\Association;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

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
        return $user->hasRole('admin'); // Adjust logic as needed
    }

    // Define methods for other actions (optional)
    public function view(User $user, Association $association)
    {
        // ... (logic for viewing specific illnesses)
        return true;
    }

    public function create(User $user)
    {
        // ... (logic for creating illnesses)
        return true;
    }

    public function update(User $user, Association $association)
    {
        // ... (logic for updating illnesses)
        return true;
    }

    public function delete(User $user, Association $association)
    {
        // ... (logic for deleting illnesses)
        return true;
    }
}

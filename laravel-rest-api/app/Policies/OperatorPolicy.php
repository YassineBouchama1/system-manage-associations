<?php

namespace App\Policies;


use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OperatorPolicy
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
        return $user->role_id  === 1 && $user->role_id  === 1; // Adjust logic as needed
    }

    // Define methods for other actions (optional)
    public function view(User $user, $operator)
    {
        // ... (logic for viewing specific illnesses)
        return $user->role_id  === 1 && ($user->role_id  === 1 && $user->association_id === $operator->association_id);
    }

    public function create(User $user)
    {
        // ... (logic for creating illnesses)
        return true;
    }

    public function update(User $user,  $operator)
    {
        // ... (logic for updating illnesses)
        return true;
    }

    public function delete(User $user,  $operator)
    {
        // ... (logic for deleting illnesses)
        return $user->role_id  === 1 && ($user->role_id  === 1 && $user->association_id === $operator->association_id);
    }
}

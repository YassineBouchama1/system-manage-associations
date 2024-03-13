<?php


namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        //1- create permissions


        // // Permissions for managing association

        Permission::create(['name' => 'create association']);
        Permission::create(['name' => 'edit association']);
        Permission::create(['name' => 'delete association']);
        Permission::create(['name' => 'read association']);




        //2- assign relevant permissions & create roles

        // Create admin role and assign all permissions
        $adminRole = Role::create(['name' => 'super admin']);
        $adminRole->syncPermissions(Permission::all());


        // Create restaurant owner role and assign relevant permissions
        // $restaurantOwnerRole = Role::create(['name' => 'super admin']);
        // $restaurantOwnerRole->syncPermissions([
        //     'create association',
        //     'edit association',
        //     'delete association',

        // ]);

        // $addNewPermissions = Role::findByName('restaurant owner');

        // $addNewPermissions->syncPermissions([
        //     'create categories',
        //     'edit categories',
        //     'delete categories',
        //     'create menu',
        //     'edit menu',
        //     'delete menu',
        //     'select subscription plan',
        //     'manage restaurant information',
        //     'manage operators'

        // ]);

        // Create operator role and assign permissions for managing menus
        // $operatorRole = Role::create(['name' => 'operator']);
        // $operatorRole->syncPermissions([
        //     'create menu',
        //     'edit menu',
        //     'delete menu'
        // ]);
    }
}

<?php


interface  Guide
{

    public function age();
}

abstract class absto
{

    abstract  function money();
}

trait maany
{

    static $saas;


    public function getIdea()
    {
        return 'first idea';
    }
}
trait maany2
{

    static $saas;


    public function getIdea2()
    {
        return 'secend idea';
    }
}


class User extends absto implements Guide
{

    public $name;
    use maany, maany2;

    public function __construct($name)
    {
        $this->name =    $name;
    }

    public function money()
    {
        return '27,200$';
    }

    public function age()
    {
        return '27';
    }

    public function getName(): string
    {
        return $this->name;
    }
    public function getIdea()
    {
        return 'first idea updated';
    }
}



$user = new User('yassine');
echo 'name is ' . $user->getName();
echo '<br>';
echo 'salry is ' . $user->money();
echo '<br>';
echo 'my idea is ' . $user->getIdea();
echo '<br>';
echo 'idea updated is ' . $user->getIdea();

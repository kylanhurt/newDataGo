<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class entity extends Model
{
    protected $table = 'entities';
    protected $fillable = ['title','description','location','published'];
}

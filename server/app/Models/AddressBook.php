<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressBook extends Model
{
    use HasFactory;
    protected $table = 'address_book';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'website',
        'gender',
        'age',
        'nationality',
        'created_at',
        'created_by'
    ];
}

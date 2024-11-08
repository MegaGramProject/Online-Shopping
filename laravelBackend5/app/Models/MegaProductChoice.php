<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MegaProductChoice extends Model
{
    protected $table = 'megagramProductChoices';
    
    public $primaryKey = ['productId'];

    protected $fillable = [
        'productId',
        'categoryChoice'
    ];

    public $timestamps = false;

    public $incrementing = false;

}

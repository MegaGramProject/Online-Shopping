<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPageViewer extends Model
{
    protected $connection = 'pgsql';
    
    protected $table = 'product_page_viewers';

    protected $primaryKey = 'id';

    protected $fillable = [
        'product_id',
        'username',
        'date_time'
    ];

    public $timestamps = false;

    public $incrementing = true;

}

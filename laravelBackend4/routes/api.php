<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackendController;

Route::get('/getAllProductDeliveryZones', [BackendController::class, 'getAllProductDeliveryZones']);
Route::get('/getDeliveryZonesOfProduct/{productId}', [BackendController::class, 'getDeliveryZonesOfProduct']);
Route::post('/addProductDeliveryZone/{productId}', [BackendController::class, 'addProductDeliveryZone']);
Route::patch('/editProductDeliveryZone/{productId}', [BackendController::class, 'editProductDeliveryZone']);
Route::delete('/deleteProductDeliveryZone/{productId}', [BackendController::class, 'deleteProductDeliveryZone']);

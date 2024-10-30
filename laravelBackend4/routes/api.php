<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackendController;

Route::get('/getAllProductDeliveryZones', [BackendController::class, 'getAllProductDeliveryZones']);
Route::get('/getDeliveryZonesOfProduct/{productId}', [BackendController::class, 'getDeliveryZonesOfProduct']);
Route::post('/addProductDeliveryZone/{productId}', [BackendController::class, 'addProductDeliveryZone']);
Route::patch('/editProductDeliveryZone/{productId}', [BackendController::class, 'editProductDeliveryZone']);
Route::delete('/deleteProductDeliveryZone/{productId}', [BackendController::class, 'deleteProductDeliveryZone']);

Route::get('/getAllProductPickupAreas', [BackendController::class, 'getAllProductPickupAreas']);
Route::get('/getPickupAreasOfProduct/{productId}', [BackendController::class, 'getPickupAreasOfProduct']);
Route::post('/addProductPickupArea/{productId}', [BackendController::class, 'addProductPickupArea']);
Route::patch('/editProductPickupArea/{productId}', [BackendController::class, 'editProductPickupArea']);
Route::delete('/deleteProductPickupArea/{productId}', [BackendController::class, 'deleteProductPickupArea']);
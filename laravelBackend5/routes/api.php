<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackendController;

Route::get('/getAllMegagramProductChoices', [BackendController::class, 'getAllMegagramProductChoices']);
Route::post('/addMegagramProductChoice', [BackendController::class, 'addMegagramProductChoice']);
Route::delete('/deleteMegagramProductChoice/{productId}', [BackendController::class, 'deleteMegagramProductChoice']);

Route::get('/getAllProductPageViewers', [BackendController::class, 'getAllProductPageViewers']);
Route::post('/addProductPageViewer', [BackendController::class, 'addProductPageViewer']);
Route::delete('/deleteProductPageViewer/{product_id}/{username}', [BackendController::class, 'deleteProductPageViewer']);


Route::post('/checkForMegagramProductChoicesAndGetNumViewsInPastMonth', [BackendController::class, 'checkForMegagramProductChoicesAndGetNumViewsInPastMonth']);
Route::post('/checkForMegagramProductChoices', [BackendController::class, 'checkForMegagramProductChoices']);
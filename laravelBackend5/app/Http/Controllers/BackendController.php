<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MegaProductChoice;
use App\Models\ProductPageViewer;
use Carbon\Carbon;


class BackendController extends Controller {


    public function getAllMegagramProductChoices() {
        $allMegagramProductChoices = MegaProductChoice::all();

        return response()->json($allMegagramProductChoices, 200);
    }

    public function addMegagramProductChoice(Request $request) {
        $productId = $request->input('productId');
        $categoryChoice = $request->input('categoryChoice');

        $newProductChoice = MegaProductChoice::create([
            'productId' => $productId,
            'categoryChoice' => $categoryChoice
        ]);
        return response()->json($newProductChoice, 201);
    }

    public function deleteMegagramProductChoice(string $productId) {

        $productChoiceToDelete = MegaProductChoice::find($productId);
        if (is_null($productChoiceToDelete)) {
            return response()->json(['message' => 'Megagram-Product-Choice not found'], 404);
        }
        $productChoiceToDelete->delete();

        return response()->json($productChoiceToDelete, 200);
    }

    public function getAllProductPageViewers() {
        $allProductPageViewers = ProductPageViewer::all();

        return response()->json($allProductPageViewers, 200);
    }

    public function addProductPageViewer(Request $request) {
        $product_id = $request->input('product_id');
        $username = $request->input('username');
        $date_time = $request->input('date_time');
        
        $alreadyPresentProductPageViewer = ProductPageViewer::where('product_id', $product_id)
            ->where('username', $username)
            ->first();
    
        if (is_null($alreadyPresentProductPageViewer)) {
            $newProductPageViewer = ProductPageViewer::create($request->all());
            return response()->json($newProductPageViewer, 201);
        } else {
            $alreadyPresentProductPageViewer->update(['date_time'=>$date_time]);
            return response()->json($alreadyPresentProductPageViewer, 200);
        }
    }
    
    public function deleteProductPageViewer(string $product_id, string $username) {
        $productPageViewerToDelete = ProductPageViewer::where('product_id', $product_id)
        ->where('username',  $username)
        ->first();

        if (is_null($productPageViewerToDelete)) {
            return response()->json(['message' => 'Product-Page-Viewer not found'], 404);
        }
        $productPageViewerToDelete->delete();

        return response()->json($productPageViewerToDelete, 200);
    }

    public function checkForMegagramProductChoicesAndGetNumViewsInPastMonth(Request $request) {
        $productIds = $request->input('productIds');

        $oneMonthAgo = Carbon::now()->subMonth();
        $allMegagramProductChoices = MegaProductChoice::all()->toArray();
        $allMegagramProductChoicesAsDict = [];
        foreach ($allMegagramProductChoices as $mpc) {
            $allMegagramProductChoicesAsDict[$mpc['productId']] = $mpc['choiceCategory'];
        }

        $numViewsInPastMonthOfGivenProducts = ProductPageViewer::whereIn('product_id', $productIds)
            ->where('date_time', '>=', $oneMonthAgo)
            ->groupBy('product_id')
            ->selectRaw('product_id, COUNT(*) as count')
            ->get();

        $numViewsOfProducts = [];
        foreach ($numViewsInPastMonthOfGivenProducts as $currProductAndCount) {
            $numViewsOfProducts[$currProductAndCount->product_id] = $currProductAndCount->count;
        }
                
        $output = [];
        foreach ($productIds as $productId) {
            $numViewsOfCurrentProduct = $numViewsOfProducts[$productId] ?? 0;
            $output[$productId] = [$allMegagramProductChoicesAsDict[$productId] ?? null, $numViewsOfCurrentProduct];
        }

        return response()->json($output, 200);
    }


    public function checkForMegagramProductChoices(Request $request) {
        $productIds = $request->input('productIds');

        $allMegagramProductChoices = MegaProductChoice::all()->toArray();
        $allMegagramProductChoicesAsDict = [];
        foreach ($allMegagramProductChoices as $mpc) {
            $allMegagramProductChoicesAsDict[$mpc['productId']] = $mpc['choiceCategory'];
        }
                
        $output = [];
        foreach ($productIds as $productId) {
            $output[$productId] = $allMegagramProductChoicesAsDict[$productId] ?? null;
        }

        return response()->json($output, 200);
    }


}
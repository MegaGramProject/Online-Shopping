<?php
namespace App\Http\Controllers;
use Exception;
use MongoDB\Client;
use MongoDB\Driver\ServerApi;
use Illuminate\Http\Request;


class BackendController extends Controller {

    protected $productDeliveryZones;

    public function __construct() {
        $uri = $_ENV['MONGODB_ATLAS_URI'];
        $apiVersion = new ServerApi(ServerApi::V1);
        $client = new Client($uri, [], ['serverApi' => $apiVersion]);
        $database = $client->selectDatabase('Megagram');
        $this->productDeliveryZones = $database->selectCollection('productDeliveryZones');
    }

    public function getAllProductDeliveryZones() {
        $data = $this->productDeliveryZones->find()->toArray();
        return response()->json($data);
    }

    public function getDeliveryZonesOfProduct(string $productId) {
        $data = $this->productDeliveryZones->find(['productId' => $productId])->toArray();
        return response()->json($data);
    }

    public function addProductDeliveryZone(Request $request, string $productId) {
        $newDocument = [
            'productId' => $productId,
            'listOfCountriesAndTheirZipsToDeliverTo' => $request->input('listOfCountriesAndTheirZipsToDeliverTo')
        ];

        $insertResult = $this->productDeliveryZones->insertOne($newDocument);
        return response()->json(['id' => $insertResult->getInsertedId()]);
    }

    public function editProductDeliveryZone(Request $request, string $productId) {
        $editResult = $this->productDeliveryZones->updateOne(
            [ 'productId' => $productId ],
            [ '$set' => [ 'listOfCountriesAndTheirZipsToDeliverTo' => $request->input('listOfCountriesAndTheirZipsToDeliverTo') ]]
        );
        return response()->json(['productFound' => $editResult->getMatchedCount()>0]);
    }

    public function deleteProductDeliveryZone(string $productId) {
        $deleteResult = $this->productDeliveryZones->deleteOne(['productId' => $productId]);
        return response()->json(['productFound' => $deleteResult->getDeletedCount()>0]);
    }


}
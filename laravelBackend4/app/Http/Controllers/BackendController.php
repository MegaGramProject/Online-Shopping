<?php
namespace App\Http\Controllers;
use Exception;
use MongoDB\Client;
use MongoDB\Driver\ServerApi;
use Illuminate\Http\Request;


class BackendController extends Controller {

    protected $productDeliveryZones;
    protected $productPickupAreas;

    public function __construct() {
        $uri = $_ENV['MONGODB_ATLAS_URI'];
        $apiVersion = new ServerApi(ServerApi::V1);
        $client = new Client($uri, [], ['serverApi' => $apiVersion]);
        $database = $client->selectDatabase('Megagram');
        $this->productDeliveryZones = $database->selectCollection('productDeliveryZones');

        $uri2 = 'mongodb://localhost:27017';
        $client2 = new Client($uri2);
        $this->productPickupAreas = $client2->selectDatabase('Megagram')->selectCollection('productPickupAreas');
    }

    public function getAllProductDeliveryZones() {
        $data = $this->productDeliveryZones->find()->toArray();
        return response()->json($data);
    }

    public function getDeliveryZonesOfProduct(string $productId) {
        $data = $this->productDeliveryZones->find(['productId' => $productId])->toArray()[0];
        return response()->json($data);
    }

    public function getProductsThatDeliverToLocation(Request $request) {
        $zipcode = $request->input('zipcode');
        $country = $request->input('country');
    
        if ($country === null) {
            return response()->json(['error' => 'Country is required'], 400);
        }
    
        if ($zipcode === null) {
            $data = $this->productDeliveryZones->find([
                "listOfCountriesAndTheirZipsToDeliverTo.$country" => ['$exists' => true]
            ], ['projection' => ['productId' => 1]])->toArray();
        } else {
            $data = $this->productDeliveryZones->find([
                "listOfCountriesAndTheirZipsToDeliverTo.$country" => ['$in' => [$zipcode, 'all']]
            ], ['projection' => ['productId' => 1]])->toArray();
        }
    
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

    public function getAllProductPickupAreas() {
        $data = $this->productPickupAreas->find()->toArray();
        return response()->json($data);
    }

    public function getPickupAreasOfProduct(string $productId) {
        $data = $this->productPickupAreas->find(['productId' => $productId])->toArray()[0];
        return response()->json($data);
    }

    public function addProductPickupArea(Request $request, string $productId) {
        $newDocument = [
            'productId' => $productId,
            'countriesAndTheirPickupLocations' => $request->input('countriesAndTheirPickupLocations')
        ];

        $insertResult = $this->productPickupAreas->insertOne($newDocument);
        return response()->json(['id' => $insertResult->getInsertedId()]);
    }

    public function editProductPickupArea(Request $request, string $productId) {
        $editResult = $this->productPickupAreas->updateOne(
            [ 'productId' => $productId ],
            [ '$set' => [ 'countriesAndTheirPickupLocations' => $request->input('countriesAndTheirPickupLocations') ]]
        );
        return response()->json(['productFound' => $editResult->getMatchedCount()>0]);
    }

    public function deleteProductPickupArea(string $productId) {
        $deleteResult = $this->productPickupAreas->deleteOne(['productId' => $productId]);
        return response()->json(['productFound' => $deleteResult->getDeletedCount()>0]);
    }

    public function getNearestPickupLocations(Request $request) {
        $nearThisLocation = $request->input('nearThisLocation');
        $limit = $request->input('limit');
    
        $output = [];
        $allRelevantData = $this->productPickupAreas->find(
            [],
            ['projection' => ['countriesAndTheirPickupLocations' => 1]]
        )->toArray();
    
        foreach ($allRelevantData as $data) {
            foreach ($data->countriesAndTheirPickupLocations as $country => $pickupLocations) {
                foreach ($pickupLocations as $pickupLocation) {
                    $output[] = [
                        'locationName' => $pickupLocation->name,
                        'distance' => 0.25+floor(rand(0, 1000)),
                        'totalHoursOpenPerWeek' => $pickupLocation->totalHoursOpenPerWeek,
                        'openingHours' => $pickupLocation->openingHours,
                        'pickupLocationAddress' => $pickupLocation->address,
                        'pickupDirections' => $pickupLocation->pickupDirections,
                        'country' => $country,
                        'zipCode' => $pickupLocation->zipcode
                    ];
                }
            }
        }
    
        usort($output, function ($a, $b) {
            return $a['distance'] <=> $b['distance'];
        });
    
        $output = array_slice($output, 0, $limit);
    
        return $output;
    }
    


}
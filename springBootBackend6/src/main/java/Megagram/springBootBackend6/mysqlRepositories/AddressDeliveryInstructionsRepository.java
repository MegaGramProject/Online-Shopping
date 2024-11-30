package Megagram.springBootBackend6.mysqlRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Megagram.springBootBackend6.mysqlModels.AddressDeliveryInstructions;


public interface AddressDeliveryInstructionsRepository extends JpaRepository<AddressDeliveryInstructions, Integer> {

    List<AddressDeliveryInstructions> findByUsername(String username);
    
    Optional<AddressDeliveryInstructions> findByAddressId(int addressId);
}

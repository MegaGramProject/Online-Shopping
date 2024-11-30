package Megagram.springBootBackend6.mysqlModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "addressDeliveryInstructions")
public class AddressDeliveryInstructions {

    @Id
    private int addressId;

    private String username;

    private String propertyType;

    private String whereToLeavePackage;

    private String securityCode;

    private String callBox;

    private Boolean keyOrFobIsRequired;

    private Boolean dogPresent;

    private String additionalInstructions;

    private String hoursOpenForDelivery;

    private Boolean availableOnFederalHolidays;

    public AddressDeliveryInstructions() {
    }

    public AddressDeliveryInstructions(int addressId, String username, String propertyType, String whereToLeavePackage,
    String securityCode, String callBox, Boolean keyOrFobIsRequired, Boolean dogPresent,
    String additionalInstructions, String hoursOpenForDelivery,
    Boolean availableOnFederalHolidays) {
        this.addressId = addressId;
        this.username = username;
        this.propertyType = propertyType;
        this.whereToLeavePackage = whereToLeavePackage;
        this.securityCode = securityCode;
        this.callBox = callBox;
        this.keyOrFobIsRequired = keyOrFobIsRequired;
        this.dogPresent = dogPresent;
        this.additionalInstructions = additionalInstructions;
        this.hoursOpenForDelivery = hoursOpenForDelivery;
        this.availableOnFederalHolidays = availableOnFederalHolidays;
    }

    public AddressDeliveryInstructions(int addressId, String username, String propertyType, String whereToLeavePackage) {
        this.addressId = addressId;
        this.username = username;
        this.propertyType = propertyType;
        this.whereToLeavePackage = whereToLeavePackage;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getWhereToLeavePackage() {
        return whereToLeavePackage;
    }

    public void setWhereToLeavePackage(String whereToLeavePackage) {
        this.whereToLeavePackage = whereToLeavePackage;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getCallBox() {
        return callBox;
    }

    public void setCallBox(String callBox) {
        this.callBox = callBox;
    }

    public Boolean isKeyOrFobIsRequired() {
        return keyOrFobIsRequired;
    }

    public void setKeyOrFobIsRequired(Boolean keyOrFobIsRequired) {
        this.keyOrFobIsRequired = keyOrFobIsRequired;
    }

    public Boolean isDogPresent() {
        return dogPresent;
    }

    public void setDogPresent(Boolean dogPresent) {
        this.dogPresent = dogPresent;
    }

    public String getAdditionalInstructions() {
        return additionalInstructions;
    }

    public void setAdditionalInstructions(String additionalInstructions) {
        this.additionalInstructions = additionalInstructions;
    }

    public String getHoursOpenForDelivery() {
        return hoursOpenForDelivery;
    }

    public void setHoursOpenForDelivery(String hoursOpenForDelivery) {
        this.hoursOpenForDelivery = hoursOpenForDelivery;
    }

    public Boolean getAvailableOnFederalHolidays() {
        return availableOnFederalHolidays;
    }

    public void setAvailableOnFederalHolidays(Boolean availableOnFederalHolidays) {
        this.availableOnFederalHolidays = availableOnFederalHolidays;
    }


}
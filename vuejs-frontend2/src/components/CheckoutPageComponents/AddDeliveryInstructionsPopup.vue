<template>

    <div class="popup" :style="{backgroundColor: 'white', position: 'absolute', top: '8%', left: '31%', width: '42em',
    display: 'flex', flexDirection: 'column', borderRadius:'0.8em', paddingBottom:'1em', gap: '1em'}">

        <div class="popupHeader" :style="{backgroundColor: '#ededed', padding: '1.5em 1.5em', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: '0.8em 0.8em 0em 0em',
        borderTop: 'none', borderLeft: 'none', borderRight: 'none'}">
            <b :style="{fontSize:'1.1em'}">Add delivery instructions</b>
            <img @click="closePopup" :src="thinGrayXIcon" class="iconToBeAdjustedForDarkMode" :style="{cursor: 'pointer', height: '1.4em', width: '1.4em'}"/>
        </div>

        <div :style="{display: 'flex', flexDirection: 'column', padding: '0.5em 1em'}">

            <b :style="{marginBottom:'-0.5em'}">{{ fullName }}</b>
            <p :style="{fontSize:'0.88em', marginBottom:'-0.5em'}">{{ addressText }}</p>
            <p :style="{marginBottom:'0.5em'}">Property type</p>

            <div :style="{display: 'flex', alignItems: 'center', gap: '0.66em'}">
                <button @click="updatePropertyType('Home')" :style="{padding: '0.2em 0.3em', backgroundColor: propertyType==='Home' ? '#ebf2ff' : 'white', borderRadius:'0.77em',
                borderWidth: propertyType==='Home' ? '0.2em' : '0.08em', width: '7em', cursor: 'pointer', fontSize:'0.8em', fontWeight: propertyType==='Home' ? 'bold' : '',
                borderColor: propertyType==='Home' ? '#5c749c' : ''}">Home</button>
                
                <button @click="updatePropertyType('Townhome')" :style="{padding: '0.2em 0.3em', backgroundColor: propertyType==='Townhome' ? '#ebf2ff' : 'white', borderRadius:'0.77em',
                borderWidth: propertyType==='Townhome' ? '0.2em' : '0.08em', width: '7em', cursor: 'pointer', fontSize:'0.8em', fontWeight: propertyType==='Townhome' ? 'bold' : '',
                borderColor: propertyType==='Townhome' ? '#5c749c' : ''}">Townhome</button>
                
                <button @click="updatePropertyType('Apartment')" :style="{padding: '0.2em 0.3em', backgroundColor: propertyType==='Apartment' ? '#ebf2ff' : 'white', borderRadius:'0.77em',
                borderWidth: propertyType==='Apartment' ? '0.2em' : '0.08em', width: '7em', cursor: 'pointer', fontSize:'0.8em', fontWeight: propertyType==='Apartment' ? 'bold' : '',
                borderColor: propertyType==='Apartment' ? '#5c749c' : ''}">Apartment</button>
                
                <button @click="updatePropertyType('Business')" :style="{padding: '0.2em 0.3em', backgroundColor: propertyType==='Business' ? '#ebf2ff' : 'white', borderRadius:'0.77em',
                borderWidth: propertyType==='Business' ? '0.2em' : '0.08em', width: '7em', cursor: 'pointer', fontSize:'0.8em', fontWeight: propertyType==='Business' ? 'bold' : '',
                borderColor: propertyType==='Business' ? '#5c749c' : ''}">Business</button>
                
                <button @click="updatePropertyType('Other')" :style="{padding: '0.2em 0.3em', backgroundColor: propertyType==='Other' ? '#ebf2ff' : 'white', borderRadius:'0.77em',
                borderWidth: propertyType==='Other' ? '0.2em' : '0.08em', width: '7em', cursor: 'pointer', fontSize:'0.8em', fontWeight: propertyType==='Other' ? 'bold' : '',
                borderColor: propertyType==='Other' ? '#5c749c' : ''}">Other</button>
            </div>

            <p :style="{color: 'gray', fontSize:'0.94em'}">{{ descriptionsOfPropertyTypes[propertyType] }}</p>

            <div v-if="(propertyType==='Business' || propertyType==='Other') && haveBusinessHoursBeenAdded==false" :style="{borderStyle: 'solid', borderColor: 'orange', borderRadius:'0.65em', width: '93%',
            padding: '0.5em 1em', marginBottom:'1em', display: 'flex', alignItems: 'center', gap: '1.2em'}">
                <img :src="warningIcon" :style="{height: '2em', width: '1.6em', pointerEvents: 'none'}"/>
                <p :style="{fontSize:'0.9em'}">Add business hours to ensure successful deliveries</p>
            </div>

            <div :style="{display: 'flex', flexDirection: 'column', gap: '0em'}">

                <div class="deliveryInstructionSectionHeader" v-if="propertyType==='Business' || propertyType==='Other'" @click="toggleDivMinimization('When is this address open for deliveries?')" :style="{backgroundColor: '#f0f0f0', padding: '1em 1em', width: '94%', cursor: 'pointer',
                position: 'relative', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderColor: 'lightgray'}">
                    <b :style="{fontSize:'0.88em'}">When is this address open for deliveries?</b>
                    <template v-if="divMinimizations['When is this address open for deliveries?']==true">
                        <p :style="{fontSize:'0.9em'}" v-for="(day) in Object.keys(businessAvailability)" :key="day">{{ day }}: {{businessAvailability[day] }}</p>
                        <p v-if="availableOnFederalHolidays==='Yes'" :style="{fontSize:'0.9em'}"><b :style="{marginRight: '1.5em'}">Federal Holidays</b> available for receiving deliveries</p>
                    </template>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '35%', left: '93%', objectFit: 'contain',
                    display: divMinimizations['When is this address open for deliveries?']==true ? '' : 'none'}"/>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '25%', left: '93%', objectFit: 'contain', display: 'none', transform:'rotate(180deg)',
                    display: divMinimizations['When is this address open for deliveries?']==true ? 'none' : ''}"/>
                </div>
                <div class="popup" v-if="divMinimizations['When is this address open for deliveries?']==false"
                :style="{backgroundColor: 'white', padding: '1em 1em', width: '86%', display: 'flex', flexDirection: 'column'}">
                    
                    <template v-if="weekdaysAreGrouped">
                        <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize:'0.9em', width: '85%'}">
                            <b :style="{color: '#e66700'}">Monday - Friday</b>
                            <a @click="toggleWeekdayGrouping" :style="{cursor: 'pointer', color: '#2f6da3'}">Ungroup weekdays</a>
                        </div>

                        <div :style="{display: 'flex', alignItems: 'center', fontSize:'0.9em', width: '87%', gap: '3%',
                        marginTop:'1em'}">
                            <select v-model="mondayToFridayOpenTime" :style="{width: '47%', padding: '0.5em 1em'}">
                                <option value="">Open</option>
                                <option value="12:00AM">12:00AM</option>
                                <option value="12:30AM">12:30AM</option>
                                <option value="1:00AM">1:00AM</option>
                                <option value="1:30AM">1:30AM</option>
                                <option value="2:00AM">2:00AM</option>
                                <option value="2:30AM">2:30AM</option>
                                <option value="3:00AM">3:00AM</option>
                                <option value="3:30AM">3:30AM</option>
                                <option value="4:00AM">4:00AM</option>
                                <option value="4:30AM">4:30AM</option>
                                <option value="5:00AM">5:00AM</option>
                                <option value="5:30AM">5:30AM</option>
                                <option value="6:00AM">6:00AM</option>
                                <option value="6:30AM">6:30AM</option>
                                <option value="7:00AM">7:00AM</option>
                                <option value="7:30AM">7:30AM</option>
                                <option value="8:00AM">8:00AM</option>
                                <option value="8:30AM">8:30AM</option>
                                <option value="9:00AM">9:00AM</option>
                                <option value="9:30AM">9:30AM</option>
                                <option value="10:00AM">10:00AM</option>
                                <option value="10:30AM">10:30AM</option>
                                <option value="11:00AM">11:00AM</option>
                                <option value="11:30AM">11:30AM</option>
                                <option value="12:00PM">12:00PM</option>
                                <option value="12:30PM">12:30PM</option>
                                <option value="1:00PM">1:00PM</option>
                                <option value="1:30PM">1:30PM</option>
                                <option value="2:00PM">2:00PM</option>
                                <option value="2:30PM">2:30PM</option>
                                <option value="3:00PM">3:00PM</option>
                                <option value="3:30PM">3:30PM</option>
                                <option value="4:00PM">4:00PM</option>
                                <option value="4:30PM">4:30PM</option>
                                <option value="5:00PM">5:00PM</option>
                                <option value="5:30PM">5:30PM</option>
                                <option value="6:00PM">6:00PM</option>
                                <option value="6:30PM">6:30PM</option>
                                <option value="7:00PM">7:00PM</option>
                                <option value="7:30PM">7:30PM</option>
                                <option value="8:00PM">8:00PM</option>
                            </select>

                            <select v-model="mondayToFridayClosedTime" :style="{width: '47%', padding: '0.5em 1em'}">
                                <option value="">Closed</option>
                                <option value="4:00AM">4:00AM</option>
                                <option value="4:30AM">4:30AM</option>
                                <option value="5:00AM">5:00AM</option>
                                <option value="5:30AM">5:30AM</option>
                                <option value="6:00AM">6:00AM</option>
                                <option value="6:30AM">6:30AM</option>
                                <option value="7:00AM">7:00AM</option>
                                <option value="7:30AM">7:30AM</option>
                                <option value="8:00AM">8:00AM</option>
                                <option value="8:30AM">8:30AM</option>
                                <option value="9:00AM">9:00AM</option>
                                <option value="9:30AM">9:30AM</option>
                                <option value="10:00AM">10:00AM</option>
                                <option value="10:30AM">10:30AM</option>
                                <option value="11:00AM">11:00AM</option>
                                <option value="11:30AM">11:30AM</option>
                                <option value="12:00PM">12:00PM</option>
                                <option value="12:30PM">12:30PM</option>
                                <option value="1:00PM">1:00PM</option>
                                <option value="1:30PM">1:30PM</option>
                                <option value="2:00PM">2:00PM</option>
                                <option value="2:30PM">2:30PM</option>
                                <option value="3:00PM">3:00PM</option>
                                <option value="3:30PM">3:30PM</option>
                                <option value="4:00PM">4:00PM</option>
                                <option value="4:30PM">4:30PM</option>
                                <option value="5:00PM">5:00PM</option>
                                <option value="5:30PM">5:30PM</option>
                                <option value="6:00PM">6:00PM</option>
                                <option value="6:30PM">6:30PM</option>
                                <option value="7:00PM">7:00PM</option>
                                <option value="7:30PM">7:30PM</option>
                                <option value="8:00PM">8:00PM</option>
                                <option value="8:30PM">8:30PM</option>
                                <option value="9:00PM">9:00PM</option>
                                <option value="9:30PM">9:30PM</option>
                                <option value="10:00PM">10:00PM</option>
                                <option value="10:30PM">10:30PM</option>
                                <option value="11:00PM">11:00PM</option>
                                <option value="11:30PM">11:30PM</option>
                                <option value="12:00AM">12:00AM</option>
                            </select>
                        </div>

                        <form @change="groupsOfHoursHaveBeenChanged('Mon-Fri')" style="display: flex; flex-direction: column; gap: 0.2em; font-size: 0.9em; margin-top:1em;">
                            <label>
                                <input type="radio" name="mondayToFridayHours" value="Open 24 hours"
                                v-model="mondayToFridayHours"/>
                                Open 24 hours
                            </label>
                            <label>
                                <input type="radio" name="mondayToFridayHours" value="Closed for deliveries"
                                v-model="mondayToFridayHours"/>
                                Closed for deliveries
                            </label>
                        </form>

                    </template>

                    <template v-if="!weekdaysAreGrouped">

                        <template v-for="(weekday) in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :key="weekday">
                            
                            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize:'0.9em', width: '85%'}">
                                <b :style="{color: '#e66700'}">{{ weekday }}</b>
                                <a v-if="weekday==='Monday'" @click="toggleWeekdayGrouping" :style="{cursor: 'pointer', color: '#2f6da3'}">Group weekdays</a>
                            </div>

                            <div :style="{display: 'flex', alignItems: 'center', fontSize:'0.9em', width: '87%', gap: '3%',
                            marginTop:'1em'}">
                                <select v-model="openTimes[weekday]" :style="{width: '47%', padding: '0.5em 1em'}">
                                    <option value="">Open</option>
                                    <option value="12:00AM">12:00AM</option>
                                    <option value="12:30AM">12:30AM</option>
                                    <option value="1:00AM">1:00AM</option>
                                    <option value="1:30AM">1:30AM</option>
                                    <option value="2:00AM">2:00AM</option>
                                    <option value="2:30AM">2:30AM</option>
                                    <option value="3:00AM">3:00AM</option>
                                    <option value="3:30AM">3:30AM</option>
                                    <option value="4:00AM">4:00AM</option>
                                    <option value="4:30AM">4:30AM</option>
                                    <option value="5:00AM">5:00AM</option>
                                    <option value="5:30AM">5:30AM</option>
                                    <option value="6:00AM">6:00AM</option>
                                    <option value="6:30AM">6:30AM</option>
                                    <option value="7:00AM">7:00AM</option>
                                    <option value="7:30AM">7:30AM</option>
                                    <option value="8:00AM">8:00AM</option>
                                    <option value="8:30AM">8:30AM</option>
                                    <option value="9:00AM">9:00AM</option>
                                    <option value="9:30AM">9:30AM</option>
                                    <option value="10:00AM">10:00AM</option>
                                    <option value="10:30AM">10:30AM</option>
                                    <option value="11:00AM">11:00AM</option>
                                    <option value="11:30AM">11:30AM</option>
                                    <option value="12:00PM">12:00PM</option>
                                    <option value="12:30PM">12:30PM</option>
                                    <option value="1:00PM">1:00PM</option>
                                    <option value="1:30PM">1:30PM</option>
                                    <option value="2:00PM">2:00PM</option>
                                    <option value="2:30PM">2:30PM</option>
                                    <option value="3:00PM">3:00PM</option>
                                    <option value="3:30PM">3:30PM</option>
                                    <option value="4:00PM">4:00PM</option>
                                    <option value="4:30PM">4:30PM</option>
                                    <option value="5:00PM">5:00PM</option>
                                    <option value="5:30PM">5:30PM</option>
                                    <option value="6:00PM">6:00PM</option>
                                    <option value="6:30PM">6:30PM</option>
                                    <option value="7:00PM">7:00PM</option>
                                    <option value="7:30PM">7:30PM</option>
                                    <option value="8:00PM">8:00PM</option>
                                </select>

                                <select v-model="closedTimes[weekday]" :style="{width: '47%', padding: '0.5em 1em'}">
                                    <option value="">Closed</option>
                                    <option value="4:00AM">4:00AM</option>
                                    <option value="4:30AM">4:30AM</option>
                                    <option value="5:00AM">5:00AM</option>
                                    <option value="5:30AM">5:30AM</option>
                                    <option value="6:00AM">6:00AM</option>
                                    <option value="6:30AM">6:30AM</option>
                                    <option value="7:00AM">7:00AM</option>
                                    <option value="7:30AM">7:30AM</option>
                                    <option value="8:00AM">8:00AM</option>
                                    <option value="8:30AM">8:30AM</option>
                                    <option value="9:00AM">9:00AM</option>
                                    <option value="9:30AM">9:30AM</option>
                                    <option value="10:00AM">10:00AM</option>
                                    <option value="10:30AM">10:30AM</option>
                                    <option value="11:00AM">11:00AM</option>
                                    <option value="11:30AM">11:30AM</option>
                                    <option value="12:00PM">12:00PM</option>
                                    <option value="12:30PM">12:30PM</option>
                                    <option value="1:00PM">1:00PM</option>
                                    <option value="1:30PM">1:30PM</option>
                                    <option value="2:00PM">2:00PM</option>
                                    <option value="2:30PM">2:30PM</option>
                                    <option value="3:00PM">3:00PM</option>
                                    <option value="3:30PM">3:30PM</option>
                                    <option value="4:00PM">4:00PM</option>
                                    <option value="4:30PM">4:30PM</option>
                                    <option value="5:00PM">5:00PM</option>
                                    <option value="5:30PM">5:30PM</option>
                                    <option value="6:00PM">6:00PM</option>
                                    <option value="6:30PM">6:30PM</option>
                                    <option value="7:00PM">7:00PM</option>
                                    <option value="7:30PM">7:30PM</option>
                                    <option value="8:00PM">8:00PM</option>
                                    <option value="8:30PM">8:30PM</option>
                                    <option value="9:00PM">9:00PM</option>
                                    <option value="9:30PM">9:30PM</option>
                                    <option value="10:00PM">10:00PM</option>
                                    <option value="10:30PM">10:30PM</option>
                                    <option value="11:00PM">11:00PM</option>
                                    <option value="11:30PM">11:30PM</option>
                                    <option value="12:00AM">12:00AM</option>
                                </select>
                            </div>

                            <form @change="hoursHaveBeenChanged(weekday)" style="display: flex; flex-direction: column; gap: 0.2em; font-size: 0.9em; margin-top:1em;">
                                <label>
                                    <input type="radio" :name="weekday+'Hours'" value="Open 24 hours"
                                    v-model="hours[weekday]"/>
                                    Open 24 hours
                                </label>
                                <label>
                                    <input type="radio" :name="weekday+'Hours'" value="Closed for deliveries"
                                    v-model="hours[weekday]"/>
                                    Closed for deliveries
                                </label>
                            </form>

                            <br/>

                        </template>

                    </template>
                    
                    <br/>

                    <template v-if="weekendsAreGrouped">
                        <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize:'0.9em', width: '85%'}">
                            <b :style="{color: '#e66700'}">Saturday - Sunday</b>
                            <a @click="toggleWeekendGrouping" :style="{cursor: 'pointer', color: '#2f6da3'}">Ungroup weekends</a>
                        </div>

                        <div :style="{display: 'flex', alignItems: 'center', fontSize:'0.9em', width: '87%', gap: '3%',
                        marginTop:'1em'}">
                            <select v-model="saturdayToSundayOpenTime" :style="{width: '47%', padding: '0.5em 1em'}">
                                <option value="">Open</option>
                                <option value="12:00AM">12:00AM</option>
                                <option value="12:30AM">12:30AM</option>
                                <option value="1:00AM">1:00AM</option>
                                <option value="1:30AM">1:30AM</option>
                                <option value="2:00AM">2:00AM</option>
                                <option value="2:30AM">2:30AM</option>
                                <option value="3:00AM">3:00AM</option>
                                <option value="3:30AM">3:30AM</option>
                                <option value="4:00AM">4:00AM</option>
                                <option value="4:30AM">4:30AM</option>
                                <option value="5:00AM">5:00AM</option>
                                <option value="5:30AM">5:30AM</option>
                                <option value="6:00AM">6:00AM</option>
                                <option value="6:30AM">6:30AM</option>
                                <option value="7:00AM">7:00AM</option>
                                <option value="7:30AM">7:30AM</option>
                                <option value="8:00AM">8:00AM</option>
                                <option value="8:30AM">8:30AM</option>
                                <option value="9:00AM">9:00AM</option>
                                <option value="9:30AM">9:30AM</option>
                                <option value="10:00AM">10:00AM</option>
                                <option value="10:30AM">10:30AM</option>
                                <option value="11:00AM">11:00AM</option>
                                <option value="11:30AM">11:30AM</option>
                                <option value="12:00PM">12:00PM</option>
                                <option value="12:30PM">12:30PM</option>
                                <option value="1:00PM">1:00PM</option>
                                <option value="1:30PM">1:30PM</option>
                                <option value="2:00PM">2:00PM</option>
                                <option value="2:30PM">2:30PM</option>
                                <option value="3:00PM">3:00PM</option>
                                <option value="3:30PM">3:30PM</option>
                                <option value="4:00PM">4:00PM</option>
                                <option value="4:30PM">4:30PM</option>
                                <option value="5:00PM">5:00PM</option>
                                <option value="5:30PM">5:30PM</option>
                                <option value="6:00PM">6:00PM</option>
                                <option value="6:30PM">6:30PM</option>
                                <option value="7:00PM">7:00PM</option>
                                <option value="7:30PM">7:30PM</option>
                                <option value="8:00PM">8:00PM</option>
                            </select>

                            <select v-model="saturdayToSundayClosedTime" :style="{width: '47%', padding: '0.5em 1em'}">
                                <option value="">Closed</option>
                                <option value="4:00AM">4:00AM</option>
                                <option value="4:30AM">4:30AM</option>
                                <option value="5:00AM">5:00AM</option>
                                <option value="5:30AM">5:30AM</option>
                                <option value="6:00AM">6:00AM</option>
                                <option value="6:30AM">6:30AM</option>
                                <option value="7:00AM">7:00AM</option>
                                <option value="7:30AM">7:30AM</option>
                                <option value="8:00AM">8:00AM</option>
                                <option value="8:30AM">8:30AM</option>
                                <option value="9:00AM">9:00AM</option>
                                <option value="9:30AM">9:30AM</option>
                                <option value="10:00AM">10:00AM</option>
                                <option value="10:30AM">10:30AM</option>
                                <option value="11:00AM">11:00AM</option>
                                <option value="11:30AM">11:30AM</option>
                                <option value="12:00PM">12:00PM</option>
                                <option value="12:30PM">12:30PM</option>
                                <option value="1:00PM">1:00PM</option>
                                <option value="1:30PM">1:30PM</option>
                                <option value="2:00PM">2:00PM</option>
                                <option value="2:30PM">2:30PM</option>
                                <option value="3:00PM">3:00PM</option>
                                <option value="3:30PM">3:30PM</option>
                                <option value="4:00PM">4:00PM</option>
                                <option value="4:30PM">4:30PM</option>
                                <option value="5:00PM">5:00PM</option>
                                <option value="5:30PM">5:30PM</option>
                                <option value="6:00PM">6:00PM</option>
                                <option value="6:30PM">6:30PM</option>
                                <option value="7:00PM">7:00PM</option>
                                <option value="7:30PM">7:30PM</option>
                                <option value="8:00PM">8:00PM</option>
                                <option value="8:30PM">8:30PM</option>
                                <option value="9:00PM">9:00PM</option>
                                <option value="9:30PM">9:30PM</option>
                                <option value="10:00PM">10:00PM</option>
                                <option value="10:30PM">10:30PM</option>
                                <option value="11:00PM">11:00PM</option>
                                <option value="11:30PM">11:30PM</option>
                                <option value="12:00AM">12:00AM</option>
                            </select>
                        </div>

                        <form @change="groupsOfHoursHaveBeenChanged('Sat-Sun')" style="display: flex; flex-direction: column; gap: 0.2em; font-size: 0.9em; margin-top:1em;">
                            <label>
                                <input type="radio" name="saturdayToSundayHours" value="Open 24 hours"
                                v-model="saturdayToSundayHours"/>
                                Open 24 hours
                            </label>
                            <label>
                                <input type="radio" name="saturdayToSundayHours" value="Closed for deliveries"
                                v-model="saturdayToSundayHours"/>
                                Closed for deliveries
                            </label>
                        </form>

                    </template>

                    <template v-if="!weekendsAreGrouped">

                        <template v-for="(weekend) in ['Saturday', 'Sunday']" :key="weekend">
                            
                            <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize:'0.9em', width: '85%'}">
                                <b :style="{color: '#e66700'}">{{ weekend }}</b>
                                <a v-if="weekend==='Saturday'" @click="toggleWeekendGrouping" :style="{cursor: 'pointer', color: '#2f6da3'}">Group weekends</a>
                            </div>

                            <div :style="{display: 'flex', alignItems: 'center', fontSize:'0.9em', width: '87%', gap: '3%',
                            marginTop:'1em'}">
                                <select v-model="openTimes[weekend]" :style="{width: '47%', padding: '0.5em 1em'}">
                                    <option value="">Open</option>
                                    <option value="12:00AM">12:00AM</option>
                                    <option value="12:30AM">12:30AM</option>
                                    <option value="1:00AM">1:00AM</option>
                                    <option value="1:30AM">1:30AM</option>
                                    <option value="2:00AM">2:00AM</option>
                                    <option value="2:30AM">2:30AM</option>
                                    <option value="3:00AM">3:00AM</option>
                                    <option value="3:30AM">3:30AM</option>
                                    <option value="4:00AM">4:00AM</option>
                                    <option value="4:30AM">4:30AM</option>
                                    <option value="5:00AM">5:00AM</option>
                                    <option value="5:30AM">5:30AM</option>
                                    <option value="6:00AM">6:00AM</option>
                                    <option value="6:30AM">6:30AM</option>
                                    <option value="7:00AM">7:00AM</option>
                                    <option value="7:30AM">7:30AM</option>
                                    <option value="8:00AM">8:00AM</option>
                                    <option value="8:30AM">8:30AM</option>
                                    <option value="9:00AM">9:00AM</option>
                                    <option value="9:30AM">9:30AM</option>
                                    <option value="10:00AM">10:00AM</option>
                                    <option value="10:30AM">10:30AM</option>
                                    <option value="11:00AM">11:00AM</option>
                                    <option value="11:30AM">11:30AM</option>
                                    <option value="12:00PM">12:00PM</option>
                                    <option value="12:30PM">12:30PM</option>
                                    <option value="1:00PM">1:00PM</option>
                                    <option value="1:30PM">1:30PM</option>
                                    <option value="2:00PM">2:00PM</option>
                                    <option value="2:30PM">2:30PM</option>
                                    <option value="3:00PM">3:00PM</option>
                                    <option value="3:30PM">3:30PM</option>
                                    <option value="4:00PM">4:00PM</option>
                                    <option value="4:30PM">4:30PM</option>
                                    <option value="5:00PM">5:00PM</option>
                                    <option value="5:30PM">5:30PM</option>
                                    <option value="6:00PM">6:00PM</option>
                                    <option value="6:30PM">6:30PM</option>
                                    <option value="7:00PM">7:00PM</option>
                                    <option value="7:30PM">7:30PM</option>
                                    <option value="8:00PM">8:00PM</option>
                                </select>

                                <select v-model="closedTimes[weekend]" :style="{width: '47%', padding: '0.5em 1em'}">
                                    <option value="">Closed</option>
                                    <option value="4:00AM">4:00AM</option>
                                    <option value="4:30AM">4:30AM</option>
                                    <option value="5:00AM">5:00AM</option>
                                    <option value="5:30AM">5:30AM</option>
                                    <option value="6:00AM">6:00AM</option>
                                    <option value="6:30AM">6:30AM</option>
                                    <option value="7:00AM">7:00AM</option>
                                    <option value="7:30AM">7:30AM</option>
                                    <option value="8:00AM">8:00AM</option>
                                    <option value="8:30AM">8:30AM</option>
                                    <option value="9:00AM">9:00AM</option>
                                    <option value="9:30AM">9:30AM</option>
                                    <option value="10:00AM">10:00AM</option>
                                    <option value="10:30AM">10:30AM</option>
                                    <option value="11:00AM">11:00AM</option>
                                    <option value="11:30AM">11:30AM</option>
                                    <option value="12:00PM">12:00PM</option>
                                    <option value="12:30PM">12:30PM</option>
                                    <option value="1:00PM">1:00PM</option>
                                    <option value="1:30PM">1:30PM</option>
                                    <option value="2:00PM">2:00PM</option>
                                    <option value="2:30PM">2:30PM</option>
                                    <option value="3:00PM">3:00PM</option>
                                    <option value="3:30PM">3:30PM</option>
                                    <option value="4:00PM">4:00PM</option>
                                    <option value="4:30PM">4:30PM</option>
                                    <option value="5:00PM">5:00PM</option>
                                    <option value="5:30PM">5:30PM</option>
                                    <option value="6:00PM">6:00PM</option>
                                    <option value="6:30PM">6:30PM</option>
                                    <option value="7:00PM">7:00PM</option>
                                    <option value="7:30PM">7:30PM</option>
                                    <option value="8:00PM">8:00PM</option>
                                    <option value="8:30PM">8:30PM</option>
                                    <option value="9:00PM">9:00PM</option>
                                    <option value="9:30PM">9:30PM</option>
                                    <option value="10:00PM">10:00PM</option>
                                    <option value="10:30PM">10:30PM</option>
                                    <option value="11:00PM">11:00PM</option>
                                    <option value="11:30PM">11:30PM</option>
                                    <option value="12:00AM">12:00AM</option>
                                </select>
                            </div>

                            <form @change="hoursHaveBeenChanged(weekend)" style="display: flex; flex-direction: column; gap: 0.2em; font-size: 0.9em; margin-top:1em;">
                                <label>
                                    <input type="radio" :name="weekend+'Hours'" value="Open 24 hours"
                                    v-model="hours[weekend]"/>
                                    Open 24 hours
                                </label>
                                <label>
                                    <input type="radio" :name="weekend+'Hours'" value="Closed for deliveries"
                                    v-model="hours[weekend]"/>
                                    Closed for deliveries
                                </label>
                            </form>

                            <br/>

                        </template>

                    </template>

                    <br/>

                    <div :style="{display: 'flex', flexDirection: 'column', gap: '1em', borderStyle: 'solid', borderColor: 'lightgray',
                    borderLeft: 'none', borderBottom: 'none', borderRight: 'none', padding: '1em 0em'}">
                        <b>Can this address receive deliveries on federal holidays?</b>

                        <div :style="{display: 'flex', alignItems: 'center', gap: '5%'}">
                            <button @click="updateFederalHolidayAvailability('No')" :style="{backgroundColor: availableOnFederalHolidays==='No' ? '#ebf2ff' : 'white', borderRadius: '0.88em', padding: '0.5em 1em',
                            cursor: 'pointer', borderWidth:'0.08em', width: '9em', fontWeight: availableOnFederalHolidays==='No' ? 'bold' : '',
                            borderColor: availableOnFederalHolidays==='No' ? '#5c749c' : ''}">No</button>
                            
                            <button @click="updateFederalHolidayAvailability('Yes')" :style="{backgroundColor: availableOnFederalHolidays==='Yes' ? '#ebf2ff' : 'white', borderRadius: '0.88em', padding: '0.5em 1em',
                            cursor: 'pointer', borderWidth:'0.08em', width: '9em', fontWeight: availableOnFederalHolidays==='Yes' ? 'bold' : '',
                            borderColor: availableOnFederalHolidays==='Yes' ? '#5c749c' : ''}">Yes</button>
                        </div>

                        <div :style="{display: 'flex', alignItems: 'end', gap: '0.5em'}">
                            <b @click="toggleFederalHolidaysAreShown" v-if="!federalHolidaysAreShown" :style="{cursor: 'pointer'}">Show holidays</b>
                            <b @click="toggleFederalHolidaysAreShown" v-else :style="{cursor: 'pointer'}">Hide holidays</b>
                            <img @click="toggleFederalHolidaysAreShown" v-if="!federalHolidaysAreShown" :src="downV" :style="{height: '1em', width: '1em', objectFit: 'contain', cursor: 'pointer'}"/>
                            <img @click="toggleFederalHolidaysAreShown" v-else :src="downV" :style="{height: '1em', width: '1em', objectFit: 'contain', cursor: 'pointer', transform:'rotate(180deg)'}"/>
                        </div>

                        <template v-if="federalHolidaysAreShown">
                            <p :style="{marginBottom:'-1.5em', marginTop:'0em', fontSize:'0.96em'}">New Year's Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Martin Luther King Jr. Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">President's Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Good Friday</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Memorial Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Independence Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Friday after July 4th</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Labor day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Thanksgiving day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Day after Thanksgiving</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Christmas Eve</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Christmas Day</p>
                            <p :style="{marginBottom:'-1.5em', fontSize:'0.96em'}">Day after Christmas</p>
                            <p>New Year's Eve</p>
                        </template>

                    </div>

                </div>

                <div class="deliveryInstructionSectionHeader" @click="toggleDivMinimization('Where should we leave your packages at this address?')" :style="{backgroundColor: '#f0f0f0', padding: '1em 1em', width: '94%', cursor: 'pointer',
                position: 'relative'}">
                    <b :style="{fontSize:'0.88em'}">Where should we leave your packages at this address?</b>
                    <p v-if="divMinimizations['Where should we leave your packages at this address?']==true && packageShouldBeLeftHere.length>0" :style="{fontSize:'0.85em'}">{{packageShouldBeLeftHere}}</p>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '35%', left: '93%', objectFit: 'contain',
                    display: divMinimizations['Where should we leave your packages at this address?']==true ? '' : 'none'}"/>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '25%', left: '93%', objectFit: 'contain', display: 'none', transform:'rotate(180deg)',
                    display: divMinimizations['Where should we leave your packages at this address?']==true ? 'none' : ''}"/>
                </div>
                <div class="popup" v-if="divMinimizations['Where should we leave your packages at this address?']==false"
                :style="{backgroundColor: 'white', padding: '1em 1em'}">
                    <form style="display: flex; flex-direction: column; gap: 0.2em; font-size: 0.9em;">
                        <label>
                            <input type="radio" name="whereShouldPackageBeLeft" value="Front door"
                            v-model="packageShouldBeLeftHere"
                            />
                            Front door
                        </label>
                        <label v-if="propertyType==='Home' || propertyType==='Townhome'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Outside garage"
                            v-model="packageShouldBeLeftHere"
                            />
                            Outside garage
                        </label>
                        <label v-if="propertyType!=='Home'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Mailroom"
                            v-model="packageShouldBeLeftHere"
                            />
                            Mailroom
                        </label>
                        <label v-if="propertyType!=='Home'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Property staff"
                            v-model="packageShouldBeLeftHere"
                            />
                            Property staff
                        </label>
                        <label v-if="propertyType!=='Home'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Building reception"
                            v-model="packageShouldBeLeftHere"
                            />
                            Building reception
                        </label>
                        <label v-if="propertyType!=='Home'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Leasing office"
                            v-model="packageShouldBeLeftHere"
                            />
                            Leasing office
                        </label>
                        <label v-if="propertyType==='Business' || propertyType==='Other'">
                            <input type="radio" name="whereShouldPackageBeLeft" value="Loading dock"
                            v-model="packageShouldBeLeftHere"
                            />
                            Loading dock
                        </label>
                        <label>
                            <input type="radio" name="whereShouldPackageBeLeft" value="No preference"
                            v-model="packageShouldBeLeftHere"
                            />
                            No preference
                        </label>
                    </form>
                </div>

                <div class="deliveryInstructionSectionHeader" @click="toggleDivMinimization('Do we need a security code, call box number, or key to access this building?')" :style="{backgroundColor: '#f0f0f0', padding: '1em 1em', width: '94%', cursor: 'pointer',
                position: 'relative', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderColor: 'lightgray'}">
                    <b :style="{fontSize:'0.88em'}">Do we need a security code, call box number, or key to access this building?</b>
                    <p v-if="divMinimizations['Do we need a security code, call box number, or key to access this building?']==true && securityCode.length>0" :style="{fontSize:'0.85em'}">Security code: {{ securityCode }}</p>
                    <p v-if="divMinimizations['Do we need a security code, call box number, or key to access this building?']==true && callBox.length>0" :style="{fontSize:'0.85em'}">Call box: {{ callBox }}</p>
                    <p v-if="divMinimizations['Do we need a security code, call box number, or key to access this building?']==true && keyOrFobIsRequired==true" :style="{fontSize:'0.85em'}">Key or fob required for delivery</p>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '35%', left: '93%', objectFit: 'contain',
                    display: divMinimizations['Do we need a security code, call box number, or key to access this building?']==true ? '' : 'none'}"/>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '25%', left: '93%', objectFit: 'contain', display: 'none', transform:'rotate(180deg)',
                    display: divMinimizations['Do we need a security code, call box number, or key to access this building?']==true ? 'none' : ''}"/>
                </div>
                <div class="popup" v-if="divMinimizations['Do we need a security code, call box number, or key to access this building?']==false"
                :style="{backgroundColor: 'white', padding: '0.8em 1em', display: 'flex', flexDirection: 'column', gap: '0.5em',
                fontSize:'0.92em'}">
                    <b>Security code</b>
                    <textarea v-model="securityCode" placeholder="Security code for the door" :style="{width: '80%', fontFamily: 'Arial', resize: 'none',
                    paddingTop: '1em', paddingLeft:'0.7em'}"></textarea>
                    <b>Call box</b>
                    <textarea v-model="callBox" placeholder="Call box number or name" :style="{width: '80%', fontFamily: 'Arial', resize: 'none',
                    paddingTop: '1em', paddingLeft:'0.7em'}"></textarea>
                    
                    <div :style="{display: 'flex', alignItems: 'center', gap: '0.6em', marginTop:'1em'}">
                        <input v-model="keyOrFobIsRequired" type="checkbox">
                        <b>Key or fob required for delivery</b>
                    </div>
                </div>

                <div class="deliveryInstructionSectionHeader" v-if="moreOptionsAreShown && propertyType!=='Apartment' && propertyType!=='Business' && propertyType!=='Other'" @click="toggleDivMinimization('Do you have a dog at this address?')" :style="{backgroundColor: '#f0f0f0', padding: '1em 1em', width: '94%', cursor: 'pointer',
                position: 'relative', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderColor: 'lightgray'}">
                    <b :style="{fontSize:'0.88em'}">Do you have a dog at this address?</b>
                    <p v-if="divMinimizations['Do you have a dog at this address?']==true && dogPresent!==null" :style="{fontSize:'0.85em'}">{{ dogPresent }}</p>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '35%', left: '93%', objectFit: 'contain',
                    display: divMinimizations['Do you have a dog at this address?']==true ? '' : 'none'}"/>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '25%', left: '93%', objectFit: 'contain', display: 'none', transform:'rotate(180deg)',
                    display: divMinimizations['Do you have a dog at this address?']==true ? 'none' : ''}"/>
                </div>
                <div class="popup" v-if="moreOptionsAreShown && divMinimizations['Do you have a dog at this address?']==false"
                :style="{backgroundColor: 'white', padding: '1em 1em', width: '86%', display: 'flex', alignItems: 'center',
                gap: '1.6em'}">
                    <button @click="updateDogAtAddress('Yes')" :style="{backgroundColor: dogPresent==='Yes' ? '#ebf2ff' : 'white', borderRadius: '0.88em', padding: '0.5em 1em',
                    cursor: 'pointer', borderWidth:'0.08em', width: '9em', fontWeight: dogPresent==='Yes' ? 'bold' : '',
                    borderColor: dogPresent==='Yes' ? '#5c749c' : ''}">Yes</button>
                    
                    <button @click="updateDogAtAddress('No')" :style="{backgroundColor: dogPresent==='No' ? '#ebf2ff' : 'white', borderRadius: '0.88em', padding: '0.5em 1em',
                    cursor: 'pointer', borderWidth:'0.08em', width: '9em', fontWeight: dogPresent==='No' ? 'bold' : '',
                    borderColor: dogPresent==='No' ? '#5c749c' : ''}">No</button>
                </div>

                <div class="deliveryInstructionSectionHeader" v-if="moreOptionsAreShown" @click="toggleDivMinimization('Do we need additional instructions to deliver to this address?')" :style="{backgroundColor: '#f0f0f0', padding: '1em 1em', width: '94%', cursor: 'pointer',
                position: 'relative', borderStyle: 'solid', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderColor: 'lightgray'}">
                    <b :style="{fontSize:'0.88em'}">Do we need additional instructions to deliver to this address?</b>
                    <p v-if="divMinimizations['Do we need additional instructions to deliver to this address?']==true && additionalInstructions.length>0" :style="{fontSize:'0.9em'}">{{ additionalInstructions }}</p>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '35%', left: '93%', objectFit: 'contain',
                    display: divMinimizations['Do we need additional instructions to deliver to this address?']==true ? '' : 'none'}"/>
                    <img :src="downV" :style="{height: '1.5em', width: '1.5em', position: 'absolute',
                    top: '25%', left: '93%', objectFit: 'contain', display: 'none', transform:'rotate(180deg)',
                    display: divMinimizations['Do we need additional instructions to deliver to this address?']==true ? 'none' : ''}"/>
                </div>
                <div class="popup" v-if="moreOptionsAreShown && divMinimizations['Do we need additional instructions to deliver to this address?']==false"
                :style="{backgroundColor: 'white', padding: '1em 1em', width: '86%'}">
                    <textarea v-model="additionalInstructions" placeholder="Provide details such as a building description, a nearby landmark, or other navigation instructions."
                    :style="{fontFamily: 'Arial', width: '100%', height: '10em', fontSize:'0.95em', paddingTop:'0.5em', paddingLeft: '0.5em',
                    resize: 'vertical'}"/>
                </div>

                <br/>
                <br/>
            </div>

            <a v-if="!moreOptionsAreShown" @click="toggleShowMoreOptions" :style="{fontSize:'0.95em', color: '#2f6da3', cursor: 'pointer', marginBottom:'-0.5em'}">Add more instructions</a>
            <a v-if="moreOptionsAreShown" @click="toggleShowMoreOptions" :style="{fontSize:'0.95em', color: '#2f6da3', cursor: 'pointer', marginBottom:'-0.5em'}">Hide more instructions</a>
            <p :style="{fontSize:'0.95em',color: '#5d5e5e'}">For example, {{ exampleInstructionsOfPropertyTypes[propertyType] }}</p>
            <i :style="{color: 'gray', fontSize:'0.78em'}">Your instructions help us deliver your packages to your expectations and will be used when possible.</i>

            <div v-if="(propertyType!=='Business' && propertyType!=='Other') || haveBusinessHoursBeenAdded==true" :style="{display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop:'2em'}">
                <button @click="saveInstructions" :style="{border: 'none', padding: '0.7em 1.2em', cursor: 'pointer', borderRadius: '2em',
                backgroundColor:'#ffe359', width:'11em'}">Save instructions</button>
            </div>

        </div>

    </div>

</template>

<script>
import downV from '@/assets/images/downV.png';
import thinGrayXIcon from '@/assets/images/thinGrayXIcon.png';
import warningIcon from '@/assets/images/warningIcon.png';

    export default {

        props: {
            addressToAddDeliveryInstructions: Object
        },

        data() {
            return {
                thinGrayXIcon,
                downV,
                warningIcon,
                fullName: '',
                addressText: '',
                propertyType: '',
                packageShouldBeLeftHere: '',
                additionalInstructions: '',
                securityCode: '',
                callBox: '',
                keyOrFobIsRequired: false,
                dogPresent: null,
                availableOnFederalHolidays: null,
                descriptionsOfPropertyTypes: {
                    Home: "Single-family home",
                    Townhome: "Townhomes",
                    Apartment: "Multi-unit residential building",
                    Business: "Office, retail store, hotel, hospital etc.",
                    Other: ""
                },
                exampleInstructionsOfPropertyTypes: {
                    Home: "unique circumstances or presence of dog",
                    Townhome: "unique circumstances or presence of dog",
                    Apartment: "unique circumstances",
                    Business: "unique circumstances",
                    Other: "unique circumstances"
                },
                divMinimizations: {
                    //key represents the div, value represents true if minimized, false otherwise
                    'Where should we leave your packages at this address?': true,
                    'Do we need a security code, call box number, or key to access this building?': true,
                    'Do you have a dog at this address?': true,
                    'Do we need additional instructions to deliver to this address?': true,
                    'When is this address open for deliveries?': true
                },
                moreOptionsAreShown: false,
                weekdaysAreGrouped: false,
                weekendsAreGrouped: false,
                mondayToFridayOpenTime: "",
                mondayToFridayClosedTime: "",
                mondayToFridayHours: "",
                saturdayToSundayOpenTime: "",
                saturdayToSundayClosedTime: "",
                saturdayToSundayHours: "",
                openTimes: {
                    Monday: '',
                    Tuesday: '',
                    Wednesday: '',
                    Thursday: '',
                    Friday: '',
                    Saturday: '',
                    Sunday: ''
                },
                closedTimes: {
                    Monday: '',
                    Tuesday: '',
                    Wednesday: '',
                    Thursday: '',
                    Friday: '',
                    Saturday: '',
                    Sunday: ''
                },
                hours: {
                    //each value is either 'Open 24 hours' or 'Closed for deliveries'
                    Monday: '',
                    Tuesday: '',
                    Wednesday: '',
                    Thursday: '',
                    Friday: '',
                    Saturday: '',
                    Sunday: ''
                },
                federalHolidaysAreShown: false,
                haveBusinessHoursBeenAdded: false,
                businessAvailability: {}
            }
        },

        mounted() {
            this.fullName = this.addressToAddDeliveryInstructions.fullName;
            this.addressText = this.addressToAddDeliveryInstructions.addressText;

            const deliveryInstructionsOfAddress = this.addressToAddDeliveryInstructions.deliveryInstructions;
            this.propertyType = deliveryInstructionsOfAddress.propertyType;
            this.packageShouldBeLeftHere = deliveryInstructionsOfAddress.whereToLeavePackage;

            if(deliveryInstructionsOfAddress.securityCode!==null) {
                this.securityCode = deliveryInstructionsOfAddress.securityCode;
            }
            if(deliveryInstructionsOfAddress.callBox!==null) {
                this.callBox = deliveryInstructionsOfAddress.callBox;
            }
            if(deliveryInstructionsOfAddress.keyOrFobIsRequired!==null) {
                this.keyOrFobIsRequired = deliveryInstructionsOfAddress.keyOrFobIsRequired;
            }
            if(deliveryInstructionsOfAddress.dogPresent!==null) {
                this.dogPresent = deliveryInstructionsOfAddress.dogPresent;
            }
            if(deliveryInstructionsOfAddress.availableOnFederalHolidays!==null) {
                this.availableOnFederalHolidays = deliveryInstructionsOfAddress.availableOnFederalHolidays;
            }
            if(deliveryInstructionsOfAddress.additionalInstructions!==null) {
                this.additionalInstructions = deliveryInstructionsOfAddress.additionalInstructions;
            }
            if(deliveryInstructionsOfAddress.hoursOpenForDelivery!==null) {
                for(let dayOfWeek of Object.keys(deliveryInstructionsOfAddress.hoursOpenForDelivery)) {
                    const hoursOpenForDay = deliveryInstructionsOfAddress.hoursOpenForDelivery[dayOfWeek];
                    this.openTimes[dayOfWeek] = hoursOpenForDay[0];
                    this.closedTimes[dayOfWeek] = hoursOpenForDay[1];
                }
                this.updateBusinessAvailability();
            }
        },

        methods: {
            closePopup() {
                this.$emit("closePopup", null);
            },

            updatePropertyType(newPropertyType) {
                if(this.propertyType!==newPropertyType) {
                    this.moreOptionsAreShown = false;
                    this.propertyType = newPropertyType;
                    for(let key of Object.keys(this.divMinimizations)) {
                        this.divMinimizations[key] = true;
                    }
                }
            },

            saveInstructions() {
                let hoursOpenForDelivery =  {};
                if(this.propertyType==='Business' || this.propertyType==='Other') {
                    this.updateBusinessAvailability();
                    if(this.haveBusinessHoursBeenAdded==false) {
                        return;
                    }
                    for(let weekday of Object.keys(this.openTimes)) {
                        hoursOpenForDelivery[weekday] = [this.openTimes[weekday], this.closedTimes[weekday]];
                    }
                }

                hoursOpenForDelivery = Object.keys(hoursOpenForDelivery).length==0 ? null : hoursOpenForDelivery;
        
                this.$emit("saveDeliveryInstructions",
                    {
                        propertyType: this.propertyType,
                        whereToLeavePackage: this.packageShouldBeLeftHere,
                        securityCode: this.securityCode.length>0 ? this.securityCode : null,
                        callBox: this.callBox.length>0 ? this.callBox : null,
                        keyOrFobIsRequired: this.keyOrFobIsRequired,
                        additionalInstructions: this.additionalInstructions.length>0 ? this.additionalInstructions : null,
                        hoursOpenForDelivery: hoursOpenForDelivery,
                        availableOnFederalHolidays: this.availableOnFederalHolidays,
                        dogPresent: this.dogPresent
                    }
                );
            },

            toggleDivMinimization(div) {
                this.divMinimizations[div] = !this.divMinimizations[div];

                if(this.divMinimizations[div]==true) {
                    if(div==='When is this address open for deliveries?') {
                        this.updateBusinessAvailability();
                    }
                }
                else if(this.divMinimizations[div]==false) {
                    for(let key of Object.keys(this.divMinimizations)) {
                        if(key!==div) {
                            this.divMinimizations[key] = true;
                        }
                    }
                }
            },

            toggleShowMoreOptions() {
                this.moreOptionsAreShown = !this.moreOptionsAreShown;
            },

            updateDogAtAddress(yesOrNo) {
                if(this.dogPresent===yesOrNo) {
                    this.dogPresent = null;
                }
                else {
                    this.dogPresent = yesOrNo;
                }
            },

            updateFederalHolidayAvailability(yesOrNo) {
                if(this.availableOnFederalHolidays===yesOrNo) {
                    this.availableOnFederalHolidays = null;
                }
                else {
                    this.availableOnFederalHolidays = yesOrNo;
                }
            },

            toggleWeekdayGrouping() {
                this.weekdaysAreGrouped = !this.weekdaysAreGrouped;
            },

            toggleWeekendGrouping() {
                this.weekendsAreGrouped = !this.weekendsAreGrouped;
            },

            toggleFederalHolidaysAreShown() {
                this.federalHolidaysAreShown = !this.federalHolidaysAreShown;
            },

            updateBusinessAvailability() {
                const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const formatTime = (time) => {
                    const [hours, minutes, period] = time.match(/(\d+):(\d+)(AM|PM)/).slice(1);
                    return `${parseInt(hours)}:${minutes}${period.toUpperCase()}`;
                };

                const result = {};

                const openingHours = days.reduce((acc, day, index) => {
                    const open = this.openTimes[day] ? formatTime(this.openTimes[day]) : null;
                    const close = this.closedTimes[day] ? formatTime(this.closedTimes[day]) : null;

                    if (open && close) {
                        acc[shortDays[index]] = `${open}-${close}`;
                    } else {
                        acc[shortDays[index]] = "Closed";
                    }
                    return acc;
                }, {});

                result.openingHours = openingHours;

                const compactHours = [];
                let startDay = null;
                let previousHours = null;

                shortDays.forEach((day, index) => {
                    const currentHours = openingHours[day];
                    if (currentHours !== previousHours) {
                        if (startDay !== null) {
                            const range = startDay === shortDays[index - 1] ? startDay : `${startDay}-${shortDays[index - 1]}`;
                            compactHours.push({ range, hours: previousHours });
                        }
                        startDay = day;
                    }
                    previousHours = currentHours;
                });

                if (startDay !== null) {
                    const range = startDay === shortDays[shortDays.length - 1] ? startDay : `${startDay}-Sun`;
                    compactHours.push({ range, hours: previousHours });
                }

                result.compactHours = compactHours.reduce((acc, { range, hours }) => {
                    acc[range] = hours;
                    return acc;
                }, {});

                for(let key of Object.keys(result.compactHours)) {
                    if(result.compactHours[key]==='12:00AM-12:00AM') {
                        result.compactHours[key] = "All day";
                    }
                }

                if(result.compactHours['Mon-Sun']==='Closed') {
                    this.businessAvailability = {};
                    this.haveBusinessHoursBeenAdded = false;
                }
                else {
                    this.businessAvailability = result.compactHours;
                    this.haveBusinessHoursBeenAdded = true;
                }
            },

            hoursHaveBeenChanged(weekday) {
                const newHoursOfWeekday = this.hours[weekday]; //either 'Open 24 hours' or 'Closed for deliveries'
                if(newHoursOfWeekday==='Open 24 hours') {
                    this.openTimes[weekday] = '12:00AM';
                    this.closedTimes[weekday] = '12:00AM';
                }
                else {
                    this.openTimes[weekday] = '';
                    this.closedTimes[weekday] = '';
                }
            },

            groupsOfHoursHaveBeenChanged(group) {
                //group is either 'Mon-Fri' or 'Sat-Sun'
                let newHoursOfGroupOfDays;
                if(group==='Mon-Fri') {
                    newHoursOfGroupOfDays = this.mondayToFridayHours; //either 'Open 24 hours' or 'Closed for deliveries'
                    if(newHoursOfGroupOfDays==='Open 24 hours') {
                        this.mondayToFridayOpenTime = '12:00AM';
                        this.mondayToFridayClosedTime = '12:00AM';
                    }
                    else {
                        this.mondayToFridayOpenTime = '';
                        this.mondayToFridayClosedTime = '';
                    }
                }
                else {
                    newHoursOfGroupOfDays = this.saturdayToSundayHours; //either 'Open 24 hours' or 'Closed for deliveries'
                    if(newHoursOfGroupOfDays==='Open 24 hours') {
                        this.saturdayToSundayOpenTime = '12:00AM';
                        this.saturdayToSundayClosedTime = '12:00AM';
                    }
                    else {
                        this.saturdayToSundayOpenTime = '';
                        this.saturdayToSundayClosedTime = '';
                    }
                }
            }
        },

        watch: {
            mondayToFridayOpenTime(newVal) {
                this.openTimes.Monday = newVal;
                this.openTimes.Tuesday = newVal;
                this.openTimes.Wednesday = newVal;
                this.openTimes.Thursday = newVal;
                this.openTimes.Friday = newVal;
            },

            mondayToFridayClosedTime(newVal) {
                this.closedTimes.Monday = newVal;
                this.closedTimes.Tuesday = newVal;
                this.closedTimes.Wednesday = newVal;
                this.closedTimes.Thursday = newVal;
                this.closedTimes.Friday = newVal;
            },

            saturdayToSundayOpenTime(newVal) {
                this.openTimes.Saturday = newVal;
                this.openTimes.Sunday = newVal;
            },

            saturdayToSundayClosedTime(newVal) {
                this.closedTimes.Saturday = newVal;
                this.closedTimes.Sunday = newVal;
            }
        }


    }

</script>



<style>

    @media (prefers-color-scheme: dark) {
        .deliveryInstructionSectionHeader {
            background-color: #4a4a4a !important;
        }
    }
</style>
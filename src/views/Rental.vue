<template>
  <section class="container row x-center pull-top">
    <PaymentModal 
      :show-payment-modal='showModal'
      title='Rent'
      :user-balance='paymentDetails.userBalance'
      :unit-num='selectedUnit'
      transactionType='rent'
      :hours='selectedHours'
      v-on:cancel-payment='offModal()'
      :confirm-payment='confirmPaymentModal'
    />
    <Card
      :tag="selectedLocation"
      :head="selectedUnit"
    />
    <div class="steps-cntr">
      <div class="content-heading">
        <div class="content-head">
          Have a Rental Unit
        </div>
        <div
          class="content-subhead"
        >
          To get started, secure a spot by reserving or renting one of our available rental units.
        </div>
      </div>
      <div class="content-body col">
        <div class="step-row col">
          <div @click="activeOption = 'Location'">
            <OptionHead
              class="optionHead"
              :head="selectedLocation"
              default-head="Location"
              label="Choose location"
              :is-active="activeOption === 'Location'"
            />
          </div>
          <div
            class="locationOption options --series"
            :class="{hidden: activeOption != 'Location'}"
          >
            <div
              v-for="(location, index) in locationOptions"
              :key="index"
              @click="
                selectedLocation = location.area_location; 
                activeOption = 'Unit'; 
                selectedAreaNum = location.area_num;
                getAreaAvailUnits(location.area_num)"
            >
              <OptionList
                :label="index+1"
                :title="location.area_location"
                :is-selected="selectedLocation === location.area_location"
              />
            </div>
          </div>
          <div class="optionDivider" />
        </div>
        <div class="step-row col">
          <div @click="activeOption = 'Unit'">
            <OptionHead
              class="optionHead"
              :head="selectedUnit"
              default-head="Unit"
              label="Choose unit"
              :is-active="activeOption === 'Unit'"
            />
          </div>
          <div
            class="options col"
            :class="{hidden: activeOption != 'Unit'}"
          >
            <div 
              class="suggested_unit y-center pull-apart row" 
              :class="{selected_unit: selectedUnit === suggestedUnit}"  
              @click="selectedUnit = suggestedUnit; activeOption = 'Hours'">
              <div>
                {{ suggestedUnit }}
              </div>
              <div class="suggested_label">
                Suggested Unit #
              </div>
            </div>
            <div class="choose_unit_option row center stick-middle">
              <div>or choose your own unit</div>
            </div>
            <div class="row unitOption --series wrap">
              <div
                v-for="unit in unitOptions"
                :key="unit"
                @click="selectedUnit = unit; activeOption = 'Hours'"
              >
                <UnitOption :unit-num="unit" :is-selected="selectedUnit === unit" />
              </div>
            </div>
          </div>
          <div class="optionDivider" />
        </div>
        <div class="step-row col">
          <div @click="activeOption = 'Hours'">
            <OptionHead
              class="optionHead"
              :head="chosenHours"
              default-head="Hours"
              label="Input no. of hours"
              :is-active="activeOption === 'Hours'"
            />
          </div>
          <div class="col options" :class="{hidden: activeOption != 'Hours'}">
            <div class="hoursOption --series row center">
              <input
                type="tel"
                name="hours"
                class="hoursOptionField"
                placeholder="6"
                 pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                v-model="selectedHours"
                ref='hoursInput'
                autofocus=true
                required
                >     
                <div class="equals">
                  =
                </div>
                <div class="fee">
                  <span>PHP </span>
                  <span>{{ totalFee }}</span>
                </div>
              </div>
              <div class="row series center">
                <DashboardTile 
                  :is-compact='true'
                  title='BASE FEE'
                  :value='baseFee'
                  prefix='PHP'
                  />
                <DashboardTile 
                  :is-compact='true'
                  title='PER HOUR'
                  :value='perHourFee'
                  prefix='PHP'
                  />
              </div>
          </div>
          <div class="optionDivider" />
        </div>
      </div>
      <div class="button-ctr row pull-right series y-center">
        <div class="btn ghost-btn" v-on:click="reserveUnit()">
          <div class="btn-label">
            RESERVE
          </div>
        </div>
        <div class="btn solid-btn" v-on:click="showModal=true;">
          <div class="btn-label">
            PAY
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/Card.vue'
import OptionList from '@/components/OptionList.vue'
import OptionHead from '@/components/OptionHead.vue'
import UnitOption from '@/components/UnitOption.vue'
import DashboardTile from '@/components/DashboardTile.vue'
import axios from '@/http-common';
import PaymentModal from '@/components/PaymentModal.vue'
import Btn from '@/_helpers/KeyMapper'
import { parse } from 'path';

export default {
  components: {
    Card,
    OptionList,
    OptionHead,
    UnitOption,
    DashboardTile,
    PaymentModal,
  },
  data() {
    return {
      locationOptionActive: true,
      unitOptionActive: false,
      hoursOptionActive: false,
      activeOption: 'Location',
      locationOptionHead: 'Location',
      selectedLocation: 'Location',
      selectedUnit: 'Unit',
      paymentDetails: {
        userBalance: '',
      },
      locationOptions: [],
      selectedAreaNum: '',
      unitOptions: [1, 4, 5, 8],
      suggestedUnit: 2,
      chosenHours: 'Hours',
      selectedHours: 0,
      baseFee: 5,
      perHourFee: 3,
      showModal: false,
      transactionInfo: {
        auth_activity_id: '',
        invoiceFee: '',
        invoiceId: '',
        invoiceFeePayment: ''
      },
      reserveTransaction: false,
      confirmPaymentModal: false
    }
  },
  computed: {
    totalFee() {
      return this.baseFee + (this.selectedHours * this.perHourFee);
    }
  },
  methods: {
    getAreaAvailUnits(areaNum) {
      axios.get(`/locker/suggest-unit?area_num=${areaNum}`)
        .then(res => {
          let availUnitResponse = res.data;
          let availUnitData = availUnitResponse.data;
          this.suggestedUnit = availUnitData.suggested_unit;
          this.unitOptions = availUnitData.other_avail_units;
          this.selectedUnit = this.suggestedUnit;
        })
    },
    offModal() {
      this.showModal = false;
    },
    reserveUnit() {
      axios.post('/locker/transaction/authorization', {
          unit_num: this.selectedUnit,
          transaction_type: 'reserve',
        })
        .then(res => {
          let responseData = res.data;

          return Promise.resolve(this.transactionInfo.auth_activity_id = responseData.data.auth_activity_id)
        })
        .then(activityId => {
          axios.post('/locker/transaction/invoice', {
            auth_activity_id: activityId,
            hours: 0
          })
          .then(res => {
            let responseData = res.data;
            let invoiceData = responseData.data;

            this.transactionInfo.invoiceFee = invoiceData.fee;
            this.transactionInfo.invoiceId = invoiceData.invoice_id;
            axios.post('/locker/transaction/authenticate', {
                invoice_id: this.transactionInfo.invoiceId,
                transaction_amount: 0
              })
              .then(res => {
                let responseData = res.data;
                let invoicePaymentData = responseData.data;
                let isNextSession = false;

                if(this.transactionType == 'overdue'){
                  isNextSession = true;
                }

                axios.post('/locker/transaction/session', {
                  auth_activity_log_id: this.transactionInfo.auth_activity_id,
                  next_session: isNextSession
                })
                .then(res => {
                  let responseData = res.data;
                  let sessionAuth = responseData.data;

                  if(responseData.success){
                    this.$router.push('unit');
                  }else{
                    console.error('Something went wrong renting you a unit. Please check developer for more information.');
                  }
                })
              })
          })
        })
    }
  },
  mounted() {

    let self = this; 
    
    window.addEventListener('keyup', function(ev) {
      if(self.activeOption == 'Location'){
        if(isNaN(parseInt(ev.key))){
          if(ev.keyCode == Btn.proceed && typeof self.selectedAreaNum == 'number'){
            self.activeOption = 'Unit'; 
            self.getAreaAvailUnits(self.selectedAreaNum);
          }
        }else {
          let inputNumber = parseInt(ev.key);
          self.selectedAreaNum = inputNumber;
          self.selectedLocation = self.locationOptions[inputNumber-1].area_location;
        }
      }else if(self.activeOption == 'Unit'){
        if(isNaN(parseInt(ev.key))){
          if(ev.keyCode == Btn.proceed && typeof self.selectedUnit == 'number'){
            self.activeOption = 'Hours'; 
          }
        }else {
          self.selectedUnit = parseInt(ev.key);
        }
      }else if(self.activeOption == 'Hours'){
        if(isNaN(parseInt(ev.key))){
          if(typeof parseInt(self.selectedHours) == 'number'){
            if(ev.keyCode == Btn.proceed){
              self.showModal = true;
            }else if(ev.keyCode == Btn.A){
              self.reserveUnit();
            }
          }
        }
      }

      if(self.showModal){
        if(ev.keyCode == Btn.E){
          self.confirmPaymentModal = true;
        }else if(ev.keyCode == Btn.cancel){
          self.showModal = false;
        }
      }
    });

    function getAreaList(that){
      return axios.get('/locker/area-list')
        .then(areaResponse => {
          let areaData = areaResponse.data;

          that.locationOptions = areaData.data;
        });
    }

    function getUserProfile(that){
      return axios.get('user/profile')
        .then(res => {
          let response = res.data;
          let rental = response.rental;

          if(response.success) {
            that.paymentDetails.userBalance = rental.user_balance;
          }else {
            console.error('Something went wrong.');
          }
        })
        .catch(err => console.error(err));
    }

    axios.all([getAreaList(self), getUserProfile(self)]);
  },
  watch: {
    activeOption(newVal, oldVal) {
      if(newVal == 'Hours'){
        this.$refs.hoursInput.focus();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  margin-top: 40px;
}

.steps-cntr {
  margin-left: 72px;
}

.content-heading {
  max-width: 380px;
  width: 100%;
  margin-bottom: 12px;
}

.content-head {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.content-subhead {
  font-size: 14px;
  color: #333;
}

.step-row {
  &:last-child {
    border-bottom: none;
  }
  .locationOption {
    @include series-col(36px);
    width: 100%;
    padding: 24px 0;
  }
}

.options {
  width: 100%;
  padding: 24px 0;
  margin-bottom: 24px;
}

.optionDivider {
  width: 100%;
  height: 1px;
  background-color: $divider-color--secondary;
}

.optionHead {
  padding: 24px 0;
}

.hidden {
  display: none;
}

.hoursOption {
  margin-bottom: 2rem;
  @include series-row(1rem);
  .equals {
    font-size: 24px;
    font-weight: 300;
    color: #aaa;
    margin-bottom: -4px;
  }
  .fee {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: -4px;
    margin-top: 4px;
    span {
      &:first-child {
        color: #ccc;
      }
      &:last-child {
        color: #333;
      }
    }
  }
}

.unitOption {
  @include series-row(12px);
}

.hoursOptionField {
  font-size: 20px;
  font-weight: 600;
  background-color: rgba($blue, .1);
  border-radius: 5px;
  padding: 4px 12px;
  border: none;
  max-width: 4rem;
  color: $accent--primary;
  &::placeholder {
    opacity: 0.25;
  }
}

.button-ctr {
  width: 100%;
  padding: 24px 0;
}

.suggested_unit {
  padding: 7px 20px;
  border-radius: 7px;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  border: 1px solid $divider-color--secondary;
  div {
    margin-bottom: -4px;
  }
  &.selected_unit {
    background-color: $blue;
    color: white;
    border: 1px solid $blue;
    .suggested_label {
      color: white;
    }
  }
}

.suggested_label {
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  color: #999;
}

.choose_unit_option {
  font-size: 12px;
  color: #888;
  font-style: italic;
  white-space: nowrap;
  width: 100%;
  padding: 1rem 0;
  div {
    margin: 0 8px;
  }
  &::before, &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: $divider-color--secondary;
  }
}
</style>

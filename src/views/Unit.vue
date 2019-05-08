<template>
  <div class="unit-view col center">
    <PaymentModal 
      v-if="showModal"
      :title='isOverdue ? "Overdue" : "Extend"'
      :user-balance='userBalance'
      :unit-num='unitNum'
      :transaction-type='isOverdue ? "overdue" : hasReservation ? "rent" : "extend"'
      :hours='selectedHours'
      v-on:cancel-payment='offModal()'
      :refresh-data='updateInfo()'
      v-on:remove-reservation='removeReservation($event)'
      v-on:show-option='optionModal($event)'
    />
    <div class="hours_input-modal-cntr" v-show='this.showHoursModal'>
      <div class="hours_input-modal">
        <div class="modal-content col">
          <div class="modal-head">
            <span>{{ hasReservation ? "Continue" : "Extend" }} </span>
            <span>Rental</span>
          </div>
          <div class="modal-body col">
            <div class="hoursOption --series row center">
              <div class="hrs-cntr">
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
                <div class="hrs-label">hrs</div>
              </div>
              
              <div class="equals">
                =
              </div>
              <div class="fee">
                <span>PHP </span>
                <span>{{ totalFee }}</span>
              </div>
            </div>
            <div class="dashboard-series row series center">
               <DashboardTile 
                :is-secondary='false' 
                :is-compact='true'
                title='CREDIT BALANCE'
                :value='userBalance'
                prefix='PHP'
                />
              <DashboardTile 
                :is-compact='true'
                title='BASE FEE'
                :value='5'
                prefix='PHP'
                />
              <DashboardTile 
                :is-compact='true'
                title='PER HOUR'
                :value='3'
                prefix='PHP'
                />
            </div>
          </div>
        </div>
        <div class="modal-cta">
          <div class="solid-btn row center" @click="confirmCta()">
            <div class="btn-label"> 
              CONFIRM EXTENSION
            </div>
          </div>
          <div class="ghost-button--secondary row center" v-on:click='cancelHoursModal'>
            CANCEL
          </div>
        </div>
      </div>
    </div>
    <div class="hours_input-modal-cntr choice-cntr" v-show='this.showChoiceModal'>
      <div class="hours_input-modal">
        <div class="modal-content col">
          <div class="modal-head">
            <span>Overdue </span>
            <span>Option+</span>
          </div>
          <div class="modal-body col">
            <div class="choice_option-cntr row center series">
              <div class="option-item row center" @click="extendOption()">
                <div>
                  EXTEND
                </div>
              </div>
              <div class="option-item row center" @click="endOption()">
                <div>
                  END RENTAL
                </div>
              </div>
            </div>
            <div class="dashboard-series row series center stick-middle">
               <DashboardTile 
                :is-secondary='false' 
                :is-compact='true'
                title='CREDIT BALANCE'
                :value='userBalance'
                prefix='PHP'
                />
            </div>
          </div>
        </div>
        <div class="modal-cta">
          <div class="solid-btn row center" @click="confirmCta()">
            <div class="btn-label"> 
              CONFIRM OPTION
            </div>
          </div>
          <div class="ghost-button--secondary row center">
            CANCEL
          </div>
        </div>
      </div>
    </div>
    <div class="row center">
      <Card 
        class=""
        :tag='this.cardTag'
        :head='this.cardHead'
        :meta-info='this.cardMeta'
        :showMetaInfo='hasRental'
        :show-cta='!hasRental'
        :is-overdue='this.isOverdue'
      />
      <div class="col card-cta-cntr">
        <div class="card-cta">ADD CREDIT</div>
        <div class="card-cta" @click="endOption()">END RENTAL</div>
      </div>
    </div>
    <div class="col center">
      <div class="dashboard-tile-cntr row center --series">
        <DashboardTile 
          class='dashboard_tile'
          title='Start of Rental'
          :value='this.startTimeFormat'
          :postfix='this.startTimeMeridiem'
          :fix-bottom='true'
        />
        <DashboardTile 
          class='dashboard_tile'
          title='End of Rental'
          :value='this.endTimeFormat'
          :postfix='this.endTimeMeridiem'
          :fix-bottom='true'
        />
        <DashboardTile 
          class='dashboard_tile'
          title='Total amount paid'
          :value='this.totalSessionAmount'
          prefix='PHP'
          :fix-bottom='true'
        />
        <div @click="ctaClick">
          <CtaTile 
            class='dashboard_tile'
            :title='this.cardMeta'
            :cta-name='isOverdue ? "Settle Account" : hasReservation ? "Rent Now" : "Extend"'
            :is-overdue='isOverdue'
          />
        </div>
      </div>
      <div class="divider"></div>
      <div class="wall_dashboard_tile-cntr row center">
        <WallDashboardTile 
          :is-first-child='true'
          prefix='PHP'
          :value='this.userBalance'
          title='User Balance'
        />
        <WallDashboardTile 
          :value='this.numSessions'
          title='Total # of Rentals'
        />
        <WallDashboardTile 
          value='May 2'
          title='Recent Rental'
          sub-value='Beside D.O.'
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import DashboardTile from '@/components/DashboardTile.vue'
import WallDashboardTile from '@/components/WallDashboardTile.vue'
import axios from '@/http-common'
import helper from '@/_helpers/textManipulation'
import CtaTile from '@/components/CtaTile.vue'
import PaymentModal from '@/components/PaymentModal.vue'
import CoinFeed from '@/components/CoinFeed.vue'

export default {
  components: {
    Card,
    DashboardTile,
    WallDashboardTile,
    CtaTile,
    PaymentModal,
    CoinFeed
  },
  data() {
    return {
      hasRental: false,
      cardTag: '',
      cardHead: '',
      cardMeta: '',
      unitNum: '',
      startTimeFormat: '',
      startTimeMeridiem: '',
      endTimeFormat: '',
      endTimeMeridiem: '',
      numSessions: '',
      sessionId: '',
      totalSessionAmount: '',
      userBalance: '',
      isOverdue: false,
      showModal: false,
      selectedHours: '',
      showHoursModal: false,
      showChoiceModal: false,
      hasReservation: false
    }
  },
  methods: {
    updateInfo() {
      function getUserInfo(that) {
        return axios.get('user/profile')
          .then(res => {
            let response = res.data;
            let rental = response.rental;
            let hasRental = false;
            let rentalEnd = rental.end;
            let rentalStart = rental.start;
            let startHourFormatObj = helper.transformHoursMinutesFormat(rentalStart);
            let endHourFormatObj = helper.transformHoursMinutesFormat(rentalEnd);
            let timeDiff = helper.getTimeLeft(rentalEnd);
            let timeLeft = helper.epochToHumanTime(timeDiff);
            let hasReservation = rental.hasReservation;

            if(timeDiff > 0){
              that.hasReservation = hasReservation;
            }else {
              console.log(timeDiff, that.hasReservation);
              if(that.hasReservation){
                that.hasReservation = false;
                that.isOverdue = false;
              }
            }

            that.startTimeFormat = startHourFormatObj.format;
            that.startTimeMeridiem = startHourFormatObj.meridiem;

            that.endTimeFormat = endHourFormatObj.format;
            that.endTimeMeridiem = endHourFormatObj.meridiem;

            that.cardMeta = timeLeft.sentence;
            that.isOverdue = timeLeft.isOverdue;

            that.sessionId = rental.session_id;
            that.userBalance = rental.user_balance;

            if(response.success) {
              hasRental = rental.hasRental;
              that.hasRental = hasRental;
              if(hasRental){
                that.unitNum = rental.unit_num;
                that.cardTag = rental.unit_area_location;
                that.cardHead = `#${that.unitNum}`;
              }else {
                let fullName = `${response.data.first_name} ${response.data.last_name}`;
                that.cardTag = fullName;
              }
            }else {
              console.error('Something went wrong.');
            }

            return Promise.resolve();
          })
          .catch(err => console.error(err))
      }

      function getSessionIds() {
        return axios.get('stats/user/sessions')
          .then(res => {
            return Promise.resolve(res);
          })
          .catch(err => console.error(err))
      }

      axios.all([getUserInfo(this), getSessionIds()])
        .then(axios.spread(function (userInfo, promiseRes2) {
          let sessionIds = [];
          let res2 = promiseRes2.data;
          let sessionData;

          if(res2.success){
            sessionData = res2.data;
            for(let i = 0; i < sessionData.length; i++){
              sessionIds.push(sessionData[i]._id);
            }
            return Promise.resolve(sessionIds);
          }else{
            return Promise.reject('Something went wrong fetching session ids.');
          }
        }))
        .then(sessionIds => {
          axios.post('/stats/rental-shares', {session_ids: sessionIds})
            .then(res => {
              let response = res.data;
              let thisSessionInfo = findObjectByKey(response, 'session_id', this.sessionId);
              let totalSessionAmount = 0;

              this.numSessions = response.length;

              for(let i = 0; i < thisSessionInfo.activities.length; i++){
                let thisActivity = thisSessionInfo.activities[i];

                totalSessionAmount += thisActivity.metadata.amount;
              }
              this.totalSessionAmount = totalSessionAmount;
            })  
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err));

        function findObjectByKey(array, key, value) {
          for (var i = 0; i < array.length; i++) {
              if (array[i][key] === value) {
                  return array[i];
              }
          }
          return null;
        }
    },
    ctaClick() {
      if(this.isOverdue){
        this.selectedHours = 0;
        this.showModal = true;
      }else {
        this.showHoursModal = true;
      }
    },
    offModal() {
      this.showModal = false;
    },
    confirmCta() {
      this.showModal = true;
      this.showHoursModal = false;
    },
    cancelHoursModal() {
      this.showHoursModal = false;
    },
    extendOption() {
      this.showChoiceModal = false;
      this.showHoursModal = true;
    },
    endOption() {
      this.showChoiceModal = false;
      axios.post('/locker/transaction/end', {
        session_id: this.sessionId
      })
      this.$router.push('/');
    },
    choiceModal() {
      this.showChoiceModal = true;
    },
    optionModal(event) {
      if(event) {
        this.showChoiceModal = true;
      }
    },
    removeReservation(event) {
      if(event){
        this.hasReservation = false;
      }
    }
  },
  computed: {
    totalFee() {
      return 5 + (this.selectedHours * 3);
    }
  },
  mounted () {
    this.updateInfo();
  }
}
</script>


<style lang="scss" scoped>
.dashboard_tile {
  width: 10rem;
}

.dashboard-tile-cntr {
  @include series-row(2rem);
  margin: 1rem 0;
}

.card {
  margin: 2rem 0;
}

.divider {
  width: 92%;
  height: 1px;
  margin: .5rem 0;
  background-color: $divider-color--secondary;
}

.hours_input-modal-cntr {
  background-color: rgba(0,0,0,.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.hours_input-modal {
  background-color: #F4F4F4;
  border-radius: 7px;
  padding: 1.25rem;
  padding-bottom: 0;
  width: 28rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 6px 28px 64px -18px rgba(0,0,0,.65);
  .ghost-button--secondary {
    font-size: 12px;
    font-weight: 600;
    color: #999;
    margin: 1.25rem 0;
  }
  .lock_icon-b_w {
    margin-right: .5rem;
    svg {
      height: 24px;
    }
  }
}

.modal-head {
  font-size: 24px;
  color: #333;
  margin: .5rem 0;
  span {
    &:first-child {
      font-weight: 600;
    }
    &:last-child {
      color: $blue;
    }
  }
}

.modal-content {
  height: 100%;
}

.modal-cta {
  .solid-btn {
    padding: .75rem 0;
    text-align: center;
    background-color: #333;
    color: white;
  }
}

.modal-body {
  margin: 2rem 0;
  height: 100%;
  .dashboard-cntr {
    @include series-row(12px);
  }
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
  font-size: 26px;
  font-weight: 600;
  background-color: rgba($blue, .085);
  border-radius: 5px;
  padding: 4px 12px;
  border: none;
  max-width: 4rem;
  position: relative;
  color: $accent--primary;
  &::placeholder {
    opacity: 0.25;
  }
}

.dashboard-series {
  div {
    width: 100%;
    max-width: 100% !important;
  }
}

.hrs-cntr {
  position: relative;
}

.hrs-label{
  font-size: 14px;
  font-family: 'Operator Mono', sans-serif;
  font-style: italic;
  color: $blue;
  opacity: .85;
  right: 10px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
}

.choice-cntr {
  .dashboard-series {
    width: 10rem;
  }
}

.choice_option-cntr {
  margin-bottom: 2rem;
  padding: 2rem 0;
}

.option-item {
  border: 1px solid rgba($blue, .35);
  border-radius: 9px;
  width: 10rem;
  height: 6rem;
  font-weight: 600;
  color: $blue;
  background-color: rgba($blue, .075);
  cursor: pointer;
  div {
    margin-bottom: -4px;
  }
  &:last-child {
    border: none;
  }
}

.card-cta {
  cursor: pointer;
  padding: 12px 18px;
}

.card-cta-cntr {
  margin-left: 2rem;
}

</style>

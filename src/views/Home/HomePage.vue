<template>
  <div>
    <h1>Book a room</h1>

    <RoomSelector
      :roomTypes="roomTypes"
      :inputValues="inputValues"
    />

    <DateSelector
      v-for="label in dateSelectorLabels"
      :key="label"
      :label="label"
      :inputValues="inputValues"
    />

    <MealSelector
      v-for="label in mealSelectorLabels"
      :key="label"
      :label="label"
      :inputValues="inputValues"
    />

    <BaseButton
      @click.native="bookThisRoom"
    >{{buttonText}}</BaseButton>

    <h1 v-if="bookingPrice">{{bookingText}}{{bookingPrice}}£</h1>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import RoomSelector from './RoomSelector.vue'
import DateSelector from './DateSelector.vue'
import MealSelector from './MealSelector.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'HomePage',
  components: {
    RoomSelector,
    DateSelector,
    MealSelector,
    BaseButton,
  },
  computed: {
    ...mapState({
      breakfastPrice: state => state.breakfastPrice,
      dinnerPrice: state => state.dinnerPrice,
    }),
    ...mapGetters(["roomTypes", "todayGetTime", "roomsInfoBySeason"]),
  },
  data() {
    return {
      dateSelectorLabels: ["From", "To"],
      mealSelectorLabels: ["breakfast", "dinner"],
      buttonText: "Book a room",
      inputValues: {
        roomType: "single room",
        breakfast: false,
        dinner: false,
      },
      dateErrorMessage: "Some date is set to a date before today.",
      bookingText: "Booking price: ",
      bookingPrice: null,
    }
  },
  methods: {
    bookThisRoom() {
      const daysInHotel = this.daysInHotel()
      const stayingPrice = daysInHotel * this.roomPrice()
      const breakfastPrice = this.inputValues.breakfast ? this.breakfastPrice * daysInHotel : 0
      const dinnerPrice = this.inputValues.dinner ? this.dinnerPrice * daysInHotel : 0
      this.bookingPrice = stayingPrice + breakfastPrice + dinnerPrice
    },
    daysInHotel() {
      const fromDate = new Date(this.inputValues.FromDate);
      const fromDateGetDate = fromDate.getDate()
      const fromDateGetMonth = fromDate.toLocaleString('default', { month: 'long' });
      const fromDateGetYear = fromDate.getFullYear()
      const fromDateGetTime = new Date(`${fromDateGetDate} ${fromDateGetMonth} ${fromDateGetYear}`).getTime()

      const toDate = new Date(this.inputValues.ToDate);
      const toDateGetDate = toDate.getDate()
      const toDateGetMonth = toDate.toLocaleString('default', { month: 'long' });
      const toDateGetYear = toDate.getFullYear()
      const toDateGetTime = new Date(`${toDateGetDate} ${toDateGetMonth} ${toDateGetYear}`).getTime()

      const oneDayInMilliseconds = 86400000
      return ((toDateGetTime - fromDateGetTime) / oneDayInMilliseconds) + 1
    },
    roomPrice() {
      const roomType = this.inputValues.roomType
      return this.roomsInfoBySeason
        .find(room => Object.keys(room)[0] === roomType)
        [roomType].price
    },
  },
  beforeMount() {
    this.inputValues["FromDate"] = this.todayGetTime;
    this.inputValues["ToDate"] = this.todayGetTime;
  }
}
</script>

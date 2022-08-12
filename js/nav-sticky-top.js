
/* Vue Component */
new Vue({
  el: "#vue-app",
  data: {
    emailInput: "",
    passwordInput: "",
    isButtonDisabled: true,
    disableStyle: {
      backgroundColor: function (disbaled) {
        return `rgba(3, 177, 244, ${disbaled ? "0.3" : "1"})`;
      },
      color: function (disbaled) {
        return `rgba(255, 255, 255, ${disbaled ? "0.9" : "1"})`;
      },
    },
  },
  methods: {
    handleButtonDisable: function (event) {
      this.isButtonDisabled = !(this.emailInput && this.passwordInput);
      var signButton = document.getElementById("sign-in");
      signButton.style.backgroundColor = this.disableStyle.backgroundColor(this.isButtonDisabled);
      signButton.style.color = this.disableStyle.color(this.isButtonDisabled);
    }
  },
  components: {
    "splash-image": {
      props: ["path", "name", "suffix"],
      template: "<img :src='path + name + suffix' :alt='name' :class='name' />"
    }
  }
});

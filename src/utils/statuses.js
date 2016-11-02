export default {
  statusDescription: function (status){
    switch(status){
      case 0:
        return "With Customer";
      case 1:
        return "Pick up requested";
      case 2:
        return "Stored";
      case 3:
        return "Delivery requested";
      default:
        return "Invalid Status Value";
    }
  },
  statusKeys: function (status){
    switch(status){
      case 0:
        return "customer";
      case 1:
        return "pickup";
      case 2:
        return "stored";
      case 3:
        return "delivery";
      default:
        return "Invalid Status Value";
    }
  },
  stageBtnLabel: function (stage){
    switch(stage){
      case 0:
        return "Loaded In Truck";
      case 1:
        return "Store In Warehouse";
      case 2:
        return "Delivered To Customer";
      default:
        return "Invalid Stage Value";
    }
  },
  nextStage: function (stage){
    switch(stage){
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 0;
      default:
        return 0;
    }
  }
};

class Report extends Http {
  getDiscountsByDate(callback,data){
    return this.call('../../app/application/get_discounts_by_date.php',data,callback);
  }
  getReportsByBuy(callback,data){
    return this.call('../../app/application/get_reports_by_buy.php',data,callback);
  }
  getPublicityByDate(callback,data){
    return this.call('../../app/application/get_publicity_by_date.php',data,callback);
  }
}
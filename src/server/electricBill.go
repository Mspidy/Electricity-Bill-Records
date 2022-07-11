package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type ElectricBillForm struct {
	BillPeriod             string `json:"bill_period" form:"bill_period"`
	BillingDays            string `json:"billing_days" form:"billing_days"`
	TotalServiceCharges    string `json:"totalService_charges" form:"totalService_charges"`
	OtherChargesAndCredit  string `json:"otherChargesAnd_credit" form:"otherChargesAnd_credit"`
	PreviousBalance        string `json:"previous_balance" form:"previous_balance"`
	TotalCharges           string `json:"total_charges" form:"total_charges"`
	RewardsAndEventsCharge string `json:"rewardsAndEvents_charges" form:"rewardsAndEvents_charges"`
}

func getCorsConfig() gin.HandlerFunc {
	var origins = []string{"*"}

	return cors.New(cors.Config{

		AllowOrigins: origins,
		AllowMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Authorization", "Accept", "Accept-Encoding",
			"Accept-Language", "Connection", "Content-Length",
			"Content-Type", "Host", "Origin", "Referer", "User-Agent", "transformRequest"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}

var forms = []ElectricBillForm{
	{
		BillPeriod:             "",
		BillingDays:            "",
		TotalServiceCharges:    "",
		OtherChargesAndCredit:  "",
		PreviousBalance:        "",
		TotalCharges:           "",
		RewardsAndEventsCharge: "",
	},
}

func main() {
	router := gin.Default()
	router.Use(getCorsConfig())
	db, err := sql.Open("mysql", "root:Prabhat@2022@tcp(127.0.0.1:3306)/electricbill?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Connection Successfully!!!")

	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalln(err)
	}

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "It works")
	})

	router.POST("/electricBills", func(c *gin.Context) {
		var user ElectricBillForm
		c.Bind(&user)
		log.Println(user)
		if user.BillPeriod != "" && user.BillingDays != "" && user.TotalServiceCharges != "" && user.OtherChargesAndCredit != "" && user.PreviousBalance != "" && user.TotalCharges != "" && user.RewardsAndEventsCharge != "" {
			if insert, _ := db.Exec(`INSERT INTO smmarry(BillPeriod, BillingDays, TotalServiceCharges, OtherChargesAndCredit, PreviousBalance, TotalCharges, RewardsAndEventsCharge) VALUES(?, ?, ?, ?, ?, ?, ?)`, user.BillPeriod, user.BillingDays, user.TotalServiceCharges, user.OtherChargesAndCredit, user.PreviousBalance, user.TotalCharges, user.RewardsAndEventsCharge); insert != nil {
				_, err := insert.LastInsertId()
				if err == nil {
					content := &ElectricBillForm{
						BillPeriod:             user.BillPeriod,
						BillingDays:            user.BillingDays,
						TotalServiceCharges:    user.TotalServiceCharges,
						OtherChargesAndCredit:  user.OtherChargesAndCredit,
						PreviousBalance:        user.PreviousBalance,
						TotalCharges:           user.TotalCharges,
						RewardsAndEventsCharge: user.RewardsAndEventsCharge,
					}
					c.JSON(http.StatusOK, gin.H{
						"status": "ok",
						"data":   content,
					})
				}
			}
		}

	})
	router.Run(":8000")
}

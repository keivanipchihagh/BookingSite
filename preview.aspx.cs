using System;

namespace BookingSite
{
    public partial class preview : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string CodeString = Request.Form["code"];
            string NameString = Request.Form["name"];
            string PriceString = Request.Form["price"];
            string actionString = Request.Form["action"];
            string fromPageString = Request.Form["fromPage"];

            if (fromPageString == null)
            {
                Response.Redirect("default.aspx");
            }
            else
            {
                // Fill Data
                codeSpan.InnerText = CodeString;
                nameSpan.InnerText = NameString;
                priceSpan.InnerText = PriceString;

                code.Value = CodeString;
                name.Value = NameString;
                price.Value = PriceString;
                action.Value = actionString;
                fromPage.Value = fromPageString;

                // Set Info
                switch (actionString)
                {
                    case "update":
                        info.InnerHtml = "Be careful! You are about to <span style=\"color: red; text-decoration: underline\">Overwite</span> this record!";
                        submit.Value = "Update";
                        break;
                    case "insert":
                        submit.Value = "Insert";
                        break;
                    case "delete":
                        info.InnerHtml = "Be extra careful! You are about to <span style=\"color: red; text-decoration: underline\">Delete</span> this record";
                        submit.Value = "Delete!";
                        break;
                }
            }
        }
    }
}
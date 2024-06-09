import { useState } from "react";
import logo from "../../assets/logo.png";
import html2pdf from "html2pdf.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useParams } from "react-router-dom";
import Buttons from "./../../components/Button/Buttons";
import dateFormat from "dateformat";
const Invoice = () => {
  const [pdfCreated, setPdfCreated] = useState(false);
  const { id } = useParams();
//   console.log(id);

  const axiosSecure = useAxiosSecure();
  const {
    data: Invoice,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments-products/${id}`);
      return data;
    },
  });

  const handleDownloadPdf = () => {
    setPdfCreated(true);
    const element = document.getElementById("invoice");
    const options = {
      margin: 0.5,
      filename: "paymentInformation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
    setPdfCreated(false);
  };

  if (isLoading) return <h2>loading</h2>;
  if (isError) return <h2>error</h2>;

  // console.log(Invoice[0]);
  // console.log(Invoice[0].buyer.name)
  const {product ,status ,date ,buyer , transactionId , price  , discount} = Invoice[0]
  console.log(product , status , date , transactionId ,price ,  discount)
  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="sm:w-11/12 lg:w-3/4 mx-auto">
        <div
          id="invoice"
          className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl"
        >
          <div className="flex justify-between">
            <div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <img src={logo} className="h-15" alt="Logo" />
                <span className="self-center text-3xl font-bold whitespace-nowrap">
                  Medicine
                </span>
              </div>
            </div>
            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Payment Information
              </h2>
              <span className="mt-1 block text-gray-500"><span className="font-bold">Transaction ID : </span> {transactionId}</span>
              <address className="mt-4 not-italic text-gray-800">
                Nakla
                <br />
                Bypass Road
                <br />
                Sherpur , Mymensingh
                <br />
                Bangladesh
                <br />
              </address>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Bill to:</h3>
              <h3 className="text-lg font-semibold text-gray-800">
                {buyer.name}
              </h3>
            </div>
            <div className="sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Payment date:
                  </dt>
                  <dd className="col-span-2 text-gray-500">{dateFormat(date)}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="border border-gray-200 p-4 rounded-lg space-y-4">
              <div className="hidden sm:grid sm:grid-cols-5">
                <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                  Email Address:
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">
                  Discount Amount
                </div>
                <div className="text-end text-xs font-medium text-gray-500 uppercase">
                  Grand Total Amount
                </div>
              </div>

              <div className="hidden sm:block border-b border-gray-200"></div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div className="col-span-full sm:col-span-2">
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Item
                  </h5>
                  <p className="font-medium text-gray-800">{buyer.email}</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </h5>
                  <p className="text-gray-800">{product.length}</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </h5>
                  <p className="text-gray-800">${discount}</p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </h5>
                  <p className="sm:text-end text-gray-800">${price}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">
                    Total Price:
                  </dt>
                  <dd className="col-span-2 text-gray-500">${price}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <h4 className="text-lg font-semibold text-gray-800">Thank you!</h4>
            <p className="text-gray-500">
              If you have any questions concerning this invoice, use the
              following contact information:
            </p>
            <div className="mt-2">
              <p className="block text-sm font-medium text-gray-800">
                shafiqulislamsagor277@gmail.com
              </p>
              <p className="block text-sm font-medium text-gray-800">
                +8801793035257
              </p>
            </div>
          </div>

          <p className="mt-5 text-base text-gray-500 flex items-center">© 2024 
            <img src={logo} className="w-8" alt="" /> Medicine.</p>
        </div>

        <div className="mt-6 flex justify-end gap-x-3">
          {!pdfCreated && (
            <>
            <Buttons
                text="Home"
                link=""
                style="hover:!bg-blue-500 hover:!text-white"
              />
              <button
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                onClick={handleDownloadPdf}
              >
                <svg
                  className="flex-shrink-0 size-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Invoice PDF
              </button>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;

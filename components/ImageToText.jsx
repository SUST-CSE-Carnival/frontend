import React, { useState, useRef } from "react";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import PageLoading from "./PageLoading";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from 'next/navigation'

export default function ImageToText(){
 const [image, setImage] = useState(null);
 const [imgStream, setImgStream] = useState("");
 const fileInputRef = useRef(null);
 const [showMessage, setShowMessage] = useState(false);
 const [medicines, setMedicines] = useState([]);
 const [quantityArray, setQuantityArray] = useState([]);
 const [medicineArray, setMedicineArray] = useState([]);
 const [loading, setLoading] = useState(false);
 const [medicinesResponse, setMedicinesResponse] = useState([]);
 const router = useRouter()
 const searchParams = useSearchParams()
 const place = searchParams.get("place")
 async function sendImage() {
   setShowMessage(false);
   if (!image) {
     console.error("No image selected");
     return;
   }


   const url = "https://api.openai.com/v1/chat/completions";
   const api_url = process.env.NEXT_PUBLIC_ENDPOINT


   try {
     const imageData = await convertImageToBase64(image);
     setLoading(true);
     const response = await fetch(url, {
       method: "POST",
       headers: {
         Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
         "content-type": "application/json",
       },
       body: JSON.stringify({
         model: "gpt-4-vision-preview",
         messages: [
           {
             role: "user",
             content: [
               {
                 type: "text",
                 text: "give an array including all text words in the image without spaces.And do not add any other sentences. I want only the array",
               },
               {
                 type: "image",
                 image: imageData,
               },
             ],
           },
         ],
         max_tokens: 500,
       }),
     });


     if (response.ok) {

        let token = localStorage.getItem("token")
        token = JSON.parse(token)

       let answer = await response.json();
       let firstAns = answer.choices[0].message.content;
       console.log(firstAns)
       const ans = JSON.parse(answer.choices[0].message.content);
       if(ans?.length == 0 || ans == null || firstAns.includes("sorry")) {
         setShowMessage(true);
         return
       }
       let medicineTempArray = [];
       for (let i = 0; i < ans.length; i = i + 2) {
            const dict = {
                name: ans[i],
                quantity: ans[i + 1]
            }
            medicineTempArray.push(dict);
        }
        setMedicineArray(medicineTempArray);
        console.log(medicineTempArray)
        setLoading(false);
        if (medicineTempArray.length > 0) {
           const response = await fetch(`${api_url}/medicine_order/ocr/create`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token.accessToken
                },
                body: JSON.stringify({
                    medicines : medicineTempArray,
                }),
            });
            const medicineResponse = await response.json()
            setMedicinesResponse(medicineResponse)
            console.log(medicineResponse)
        }
        
     } else {
       console.error("Failed to send message");
     }
   } catch (error) {
     console.error("Error sending image:", error);
   }
 }


 const convertImageToBase64 = (image) => {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(image);
     reader.onload = () => resolve(reader.result.split(",")[1]);
     reader.onerror = (error) => reject(error);
   });
 };


 const handleSubmit = () => {
   if (image !== null) {
     sendImage();
   } else {
     console.log(medicines);
   }
 };


 const handleFileChange = (e) => {
   setShowMessage(false);
   const file = e.target.files[0];
   setImage(file);


   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => {
     setImgStream(reader.result);
   };
 };


 const handleAdd = () => {
   setImgStream("");
   setImage(null);
   setShowMessage(false);
   if (medicineName !== "" && quantity !== "") {
     setMedicines((prev) => [...prev, medicineName]);
     setQuantityArray((prev) => [...prev, quantity]);
   }
   console.log(medicines);
   console.log("Add button clicked");
 };

 async function handleMedicinePayment() {
    setLoading(true)
    let description = ""
    for (let item in medicinesResponse?.medicines) {
      description += `${item.name} - ${item.quantity} pieces, \n`
    }
    const medicineData = {
      description,
      price : (parseInt(medicinesResponse.price) + 5).toString(),
      place : place
    }

    let token = localStorage.getItem("token")
    token = JSON.parse(token)
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
    const response = await fetch(`${endpoint}/medicine_order/create/`, {
      method: 'POST',
      headers : {'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.accessToken
    },
      body : JSON.stringify(medicineData)
    })
    const ans = await response.json()
    setLoading(false)
    if(ans.detail == "Success") {
      router.push("/payment_confirmation")
    }

  }


 return (
   <section>
        <form encType="multipart/form-data" className="flex items-center justify-center">
        <div className="p-8 flex flex-col items-center">
        {imgStream === "" ? (
            <div className="w-[500px] h-[400px] bg-slate-200 mt-1 mb-2 border-2 border-solid border-white rounded overflow-y-auto">
            {medicines.map((medicine, index) => {
                return (
                <div
                    key={index}
                    className="flex justify-between items-center w-full pl-8 pr-8"
                >
                    <p className="text-black text-2xl font-bold">{medicine}</p>
                    <p className="text-black text-2xl font-bold">
                    {quantityArray[index]}
                    </p>
                </div>
                );
            })}
            </div>
        ) : (
            <Image
            src={imgStream}
            alt="profile picture"
            width={500}
            height={600}
            className="bg-slate-200 mt-1 mb-3 border-2 border-solid border-white object-cover rounded"
            />
        )}
        {showMessage && (
            <>
            <p className="text-red-500">
                Sorry, there is some error in processing the image
            </p>
            <p className="text-red-500">
                Please fill the form or try to upload the image again
            </p>
            </>
        )}
        <div className="flex w-full space-x-4 items-center justify-center mt-4">
            <div className="w-[16rem] h-[2rem] flex justify-center items-center hover:border-2 hover:border-gray-400 hover:rounded-lg">
            <div
                onClick={() => fileInputRef.current.click()}
                className="file-input file-input-bordered file-input-xs w-full h-full max-w-xs flex cursor-pointer"
            >
                <div className="w-[40%] h-full bg-slate-600 text-white flex justify-center items-center">
                Choose image
                </div>
                <div className="w-[60%] h-full text-gray-700 flex justify-center items-center">
                {imgStream === "" ? "No image chosen" : "Image chosen"}
                </div>
            </div>
            </div>
            <input
            className="hidden"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            />
            <div
            className="w-[2.8rem] h-[2.8rem] hover:bg-slate-400 flex justify-center items-center rounded-full cursor-pointer"
            onClick={handleSubmit}
            >
            <IoSend className="text-2xl text-blue-400" />
            </div>
        </div>
        </div>
    </form>
    <div>
        { loading && <PageLoading /> }
    </div>
    <div className="h-[50rem] w-full">
        { medicinesResponse && medicinesResponse?.medicines?.length > 0 && 
            <>
                <div className="flex flex-col items-center">
                <h1 className="text-2xl w-full text-center my-4">Medicines Found : </h1>
                <div className="grid grid-cols-2 gap-4">
                    {medicinesResponse.medicines.map((medicine, index) => {
                        return (
                            <div key={index} className="flex my-4 items-center w-full space-x-6 px-6 py-2 rounded-full border border-gray-200">
                                <p className="text-black text-2xl my-2 font-bold"> {index + 1}. {medicine.name} : </p>
                                <p className="text-black text-2xl font-bold">{" " + medicine.quantity} Pieces</p>
                            </div>
                        )
                        })}
                    </div>
                    <h1 className="text-2xl my-6">Total Price : <span className="font-semibold">{medicinesResponse.price}</span> Taka</h1>
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleMedicinePayment} className="bg-[#2a818d] hover:bg-[#2a818d]  text-white rounded-lg">Complete Payment</Button> 
                </div>
            </>
        }
    </div>

   </section>
 );
};
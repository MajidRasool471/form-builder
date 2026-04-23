import React from "react";
import {Layout} from "antd";
import FormBuilder from "./components/FormBuilder";

const {Header, Content} = Layout;

function App() {

  return (
    <Layout className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-200">
     <Header
     className="!h-auto px-4 md:px-8 lg:px-12 py-3 md:py-4 flex items-center justify-between
     bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 shadow-md border-b border-white/10">
       <div
       className="flex items-center gap-3 -ml-1 md:-ml-6">
        <div
        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500
        to-purple-500 text-white flex items-center justify-center
        text-indigo-600 font-bold text-lg md:text-xl shadow-md hover:scale-105 transition">
          F
          </div>
          </div>
          <div className="flex-1 flex justify-center">
          <h1
          className="text-white text-sm sm:text-base md:text-xl lg:text-2xl font-semibold
          tracking-wide text-center whitespace-nowrap">
            <span className="font-bold">
              FormForge
            </span>
            <span  className="mx-2 text-purple-200">
              -
            </span>
            <span className="text-purple-200 font-medium">
              Dynamic Form Builder
            </span>
            </h1>
          </div>
     </Header>
     <Content className="px-2 sm:px-3 md:px-4 lg:px-8 py-4 md:py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br via-blue-100 to-indigo-300 rounded-2xl shadow-md hover:shadow-xl
         transition-all duration-300 p-4 sm:p-5 md:p-6">
            <FormBuilder />
        </div>
      </div>
     </Content>
     </Layout>
  );
}
 export default App;
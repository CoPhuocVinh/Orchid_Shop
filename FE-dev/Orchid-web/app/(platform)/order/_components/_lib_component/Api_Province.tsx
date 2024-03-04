import React, { useState, useEffect } from "react";
import classes from "../styles/Cart.module.css";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { MdLocationPin } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateTotal, removeItem, clearCart } from "@/redux/reducers/cartSlice";
import { removeAllFromCheckout } from "@/redux/reducers/checkoutSlice";

import axios from "axios";
import ProductCheckout from "../components/Header/Cart/ProductCheckout";
import axiosInstance from "../utils/axiosClient";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import useOrder from "../hooks/useOrder";

const CheckoutForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");

  //init to store fullAddress
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");

  // store api map
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showOtherAddress, setShowOtherAddress] = useState(false);
  const handleShowOtherAddress = () => {
    setShowOtherAddress(!showOtherAddress);
  };
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { saveOrderList } = useOrder();

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh, thành phố
    axios
      .get(`https://provinces.open-api.vn/api/`)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;

    const province = provinces.find(
      (p) => p.code === Number(selectedProvinceCode)
    );
    setSelectedProvince(province.name);

    // Gọi API để lấy danh sách quận, huyện dựa trên tỉnh, thành phố đã chọn
    axios
      .get(
        `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`
      )
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const handleDistrictChange = (event) => {
    const selectedCity = event.target.value;
    const district = districts.find((p) => p.code === Number(selectedCity));
    setSelectedDistrict(district.name);

    // Gọi API để lấy danh sách xã dựa trên quận, huyện đã chọn
    axios
      .get(`https://provinces.open-api.vn/api/d/${selectedCity}?depth=2`)
      .then((response) => {
        setWard(response.data.wards);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const handleWardChange = (event) => {
    const selectedWardCode = event.target.value;

    const wardCode = ward.find((p) => p.code === Number(selectedWardCode));
    setSelectedWard(wardCode.name);
  };
  const fullAddress = `${selectedProvince}, ${selectedDistrict}, ${selectedWard}, ${address}`;

  const { products, totalPriceCheckout, checkoutAmount } = useSelector(
    (store) => store.checkout
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateTotal());
  }, [products, useDispatch()]);

  var formattedTotalCheckout =
    totalPriceCheckout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫";

  const onCheckout = async () => {
    const fotmatProductList = products.map((product) => {
      const { sku, ...otherProps } = product;

      return {
        ...otherProps,
        code: sku,
      };
    });

    const values = {
      storeId: "6fd326ff-808e-4eac-b497-a137a5b44080",
      orderType: "DELIVERY",
      paymentType: "CASH",
      productList: fotmatProductList,
      totalAmount: totalPriceCheckout,
      finalAmount: totalPriceCheckout,
      customerName,
      customerPhone,
      note,
      deliveryAddress: fullAddress,
    };

    try {
      const res = await axiosInstance.post("/users/order", values);

      console.log(res);
      saveOrderList(res);
      setShow(false);
      dispatch(removeAllFromCheckout());
      dispatch(clearCart());
      enqueueSnackbar("đặt hàng thành công", { variant: "success" });
      router.push("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("đặt hàng thất bại", { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <BreadCrumb
          // className="d-flex justify-content-center"
          // href="/checkout"
          title="Thanh toán"
          descriptionTitle="Giỏ hàng của bạn"
          middlePath="Giỏ hàng"
        />
      </div>

      <div className="container bg-light pb-3">
        <div className="billingAddress bg-white py-4">
          <div className="d-flex align-items-center billingTitle p-2">
            <MdLocationPin style={{ color: "#f79c43" }} />
            <h5 style={{ color: "#f79c43" }} className="m-0">
              Địa chỉ nhận hàng
            </h5>
          </div>
          <div className="billingInformation d-flex justify-content-between flex-wrap text-body">
            <form action="" className="d-flex ">
              <div className="container w-60">
                <div className="d-flex justify-content-between flex-wrap">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Họ và tên"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <input
                    className="form-control mt-3"
                    type="text"
                    placeholder="Số điện thoại"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
                <div className=" container d-flex flex-wrap px-0 mt-3">
                  <div className="form-group mb-3 w-100 " id="province">
                    {/* <label htmlFor="province"></label> */}
                    <div className="custom_select">
                      <select
                        className="form-control"
                        id="billingProvince"
                        onChange={handleProvinceChange}
                      >
                        <option value="" placeholder="">
                          Tỉnh thành
                        </option>
                        {provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    className="form-group mb-3 w-100"
                    id="city"
                    onChange={handleDistrictChange}
                    disabled={!provinces.length}
                  >
                    {/* <label htmlFor="city"></label> */}
                    <div className="custom_select">
                      <select
                        className="form-control"
                        id="billingCity"
                        onChange={handleDistrictChange}
                      >
                        <option value="">Quận, huyện</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div
                    className="form-group mb-3 w-100"
                    id="district"
                    disabled={!districts.length || !provinces.length}
                    onChange={handleWardChange}
                  >
                    {/* <label htmlFor="district"></label> */}
                    <div className="custom_select">
                      <select className="form-control" id="billingDistrict">
                        <option value="">Phường, xã</option>
                        {ward.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Địa chỉ cụ thể"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group w-50 ">
                <textarea
                  rows={14}
                  className="form-control"
                  placeholder="Ghi chú (tuỳ chọn)"
                  defaultValue={""}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div
          className={`${classes.tableProduct} billingDetail bg-white mt-3 pt-3`}
        >
          <div className="text-body">
            <table className="table">
              <thead>
                <tr className="">
                  <th className="product-name">SẢN PHẨM</th>
                  <th></th>
                  <th className="product-price text-center">GIÁ</th>
                  <th className="product-quantity text-center">SỐ LƯỢNG</th>
                  <th className="product-subtotal text-center">TỔNG CỘNG</th>
                  <th className="product-remove"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <ProductCheckout
                    key={new Date().getTime() + Math.random()}
                    productInMenuId={item.productInMenuId}
                    name={item.name}
                    sellingPrice={item.sellingPrice}
                    picUrl={item.picUrl}
                    amount={item.attribute.amount}
                    sku={item.sku}
                    type={item.type}
                    categoryCode={item.categoryCode}
                    parentProductId={item.parentProductId}
                    handleQuantityChange={(newQuantity) =>
                      handleQuantityChange(item.id, newQuantity)
                    }
                  />
                ))}
              </tbody>
            </table>
            <div className="container">
              <div className="d-flex justify-content-end me-5">
                <p className="me-5">
                  Tổng thanh toán ({checkoutAmount} sản phẩm):
                </p>
                <p style={{ color: "#f79c43" }}> {formattedTotalCheckout} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mt-3 ">
          <div className="heading_s1 p-2">
            <h4 className="w-100 ">Phương thức thanh toán</h4>
          </div>
          <div className="d-flex pb-3  ">
            <div className="d-grid ms-2 col-6 align-items-center pt-3">
              <div className="payment_option  ">
                <div className="custome-radio">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_option"
                    id="exampleRadios4"
                    defaultValue="option4"
                  />
                  <label
                    className="form-check-label text-muted"
                    htmlFor="exampleRadios4"
                  >
                    Thanh toán khi nhận hàng (COD)
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center col-6">
              <>
                <Button className="btn btn-fill-out" onClick={handleShow}>
                  Đặt hàng
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Đơn hàng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Xác nhận đơn hàng</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Hủy
                    </Button>
                    <Button className="btn btn-fill-out" onClick={onCheckout}>
                      Xác nhận
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;

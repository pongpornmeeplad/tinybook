import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Radio, Typography } from 'antd';

import bgImage from './assets/afaps48-bg.png';

import CombinedLocationSearch from './CombinedLocationSearch';

const { TextArea } = Input;
const { Search } = Input;

const provincesData = [
    { name: 'กรุงเทพมหานคร', lat: 13.7563, lng: 100.5018 },
    { name: 'กระบี่', lat: 8.0863, lng: 98.9063 },
    { name: 'กาญจนบุรี', lat: 14.0041, lng: 99.5483 },
    { name: 'กาฬสินธุ์', lat: 16.4322, lng: 103.5061 },
    { name: 'กำแพงเพชร', lat: 16.4827, lng: 99.5227 },
    { name: 'ขอนแก่น', lat: 16.4320, lng: 102.8236 },
    { name: 'จันทบุรี', lat: 12.6114, lng: 102.1039 },
    { name: 'ฉะเชิงเทรา', lat: 13.6904, lng: 101.0779 },
    { name: 'ชลบุรี', lat: 13.3611, lng: 100.9847 },
    { name: 'ชัยนาท', lat: 15.1794, lng: 100.1254 },
    { name: 'ชัยภูมิ', lat: 15.8068, lng: 102.0318 },
    { name: 'ชุมพร', lat: 10.4930, lng: 99.1800 },
    { name: 'เชียงราย', lat: 19.9104, lng: 99.8406 },
    { name: 'เชียงใหม่', lat: 18.7883, lng: 98.9853 },
    { name: 'ตรัง', lat: 7.5593, lng: 99.6115 },
    { name: 'ตราด', lat: 12.2428, lng: 102.5170 },
    { name: 'ตาก', lat: 16.8773, lng: 99.1255 },
    { name: 'นครนายก', lat: 14.2069, lng: 101.2131 },
    { name: 'นครปฐม', lat: 13.8199, lng: 100.0639 },
    { name: 'นครพนม', lat: 17.4017, lng: 104.7784 },
    { name: 'นครราชสีมา', lat: 14.9799, lng: 102.0977 },
    { name: 'นครศรีธรรมราช', lat: 8.4304, lng: 99.9631 },
    { name: 'นครสวรรค์', lat: 15.7043, lng: 100.1372 },
    { name: 'นนทบุรี', lat: 13.8591, lng: 100.5217 },
    { name: 'นราธิวาส', lat: 6.4264, lng: 101.8234 },
    { name: 'น่าน', lat: 18.7756, lng: 100.7738 },
    { name: 'บึงกาฬ', lat: 18.3644, lng: 103.6434 },
    { name: 'บุรีรัมย์', lat: 14.9930, lng: 103.1029 },
    { name: 'ปทุมธานี', lat: 14.0209, lng: 100.5250 },
    { name: 'ประจวบคีรีขันธ์', lat: 11.8116, lng: 99.7971 },
    { name: 'ปราจีนบุรี', lat: 14.0500, lng: 101.3700 },
    { name: 'ปัตตานี', lat: 6.8678, lng: 101.2501 },
    { name: 'พระนครศรีอยุธยา', lat: 14.3470, lng: 100.5670 },
    { name: 'พังงา', lat: 8.4471, lng: 98.5280 },
    { name: 'พัทลุง', lat: 7.6167, lng: 100.0833 },
    { name: 'พิจิตร', lat: 16.4464, lng: 100.3487 },
    { name: 'พิษณุโลก', lat: 16.8217, lng: 100.2659 },
    { name: 'เพชรบุรี', lat: 13.1133, lng: 99.9397 },
    { name: 'เพชรบูรณ์', lat: 16.4198, lng: 101.1606 },
    { name: 'แพร่', lat: 18.1445, lng: 100.1413 },
    { name: 'ภูเก็ต', lat: 7.8804, lng: 98.3923 },
    { name: 'มหาสารคาม', lat: 16.1857, lng: 103.3029 },
    { name: 'มุกดาหาร', lat: 16.5446, lng: 104.7192 },
    { name: 'แม่ฮ่องสอน', lat: 19.3020, lng: 97.9654 },
    { name: 'ยโสธร', lat: 15.7922, lng: 104.1451 },
    { name: 'ยะลา', lat: 6.5406, lng: 101.2817 },
    { name: 'ร้อยเอ็ด', lat: 16.0545, lng: 103.6530 },
    { name: 'ระนอง', lat: 9.9658, lng: 98.6348 },
    { name: 'ระยอง', lat: 12.6835, lng: 101.2530 },
    { name: 'ราชบุรี', lat: 13.5362, lng: 99.8175 },
    { name: 'ลพบุรี', lat: 14.7995, lng: 100.6534 },
    { name: 'ลำปาง', lat: 18.2888, lng: 99.4928 },
    { name: 'ลำพูน', lat: 18.5826, lng: 99.0087 },
    { name: 'เลย', lat: 17.4860, lng: 101.7223 },
    { name: 'ศรีสะเกษ', lat: 15.1184, lng: 104.3223 },
    { name: 'สกลนคร', lat: 17.1549, lng: 104.1406 },
    { name: 'สงขลา', lat: 7.1898, lng: 100.5953 },
    { name: 'สตูล', lat: 6.6238, lng: 100.0674 },
    { name: 'สมุทรปราการ', lat: 13.5969, lng: 100.6013 },
    { name: 'สมุทรสงคราม', lat: 13.4097, lng: 100.0028 },
    { name: 'สมุทรสาคร', lat: 13.5475, lng: 100.2730 },
    { name: 'สระแก้ว', lat: 13.8240, lng: 102.0728 },
    { name: 'สระบุรี', lat: 14.5289, lng: 100.9108 },
    { name: 'สิงห์บุรี', lat: 14.8936, lng: 100.3960 },
    { name: 'สุโขทัย', lat: 17.0070, lng: 99.8237 },
    { name: 'สุพรรณบุรี', lat: 14.4711, lng: 100.1173 },
    { name: 'สุราษฎร์ธานี', lat: 9.1382, lng: 99.3212 },
    { name: 'สุรินทร์', lat: 14.8818, lng: 103.4936 },
    { name: 'หนองคาย', lat: 17.8785, lng: 102.7428 },
    { name: 'หนองบัวลำภู', lat: 17.2046, lng: 102.4407 },
    { name: 'อ่างทอง', lat: 14.5896, lng: 100.4537 },
    { name: 'อำนาจเจริญ', lat: 15.8580, lng: 104.6258 },
    { name: 'อุดรธานี', lat: 17.4138, lng: 102.7870 },
    { name: 'อุตรดิตถ์', lat: 17.6200, lng: 100.0993 },
    { name: 'อุทัยธานี', lat: 15.3859, lng: 100.0265 },
    { name: 'อุบลราชธานี', lat: 15.2442, lng: 104.8477 }
];









function Page1({ inputValues, setInputValues }) {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [addressOption, setAddressOption] = useState('A');

    


  

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => setFadeOut(true), 1000);
        const hideMessageTimer = setTimeout(() => setShowWelcome(false), 1000);
        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(hideMessageTimer);
        };
    }, []);

    const handleInputChange = (e, field) => {
        setInputValues({
            ...inputValues,
            [field]: e.target.value
        });
    };

    useEffect(() => {
        setInputValues((prevValues) => ({
            ...prevValues,
            Latlong: { lat: 0, lng: 0 }, // ค่าเริ่มต้นสำหรับ Latlong
        }));
    }, []);

    const handleNextClick = () => {
        console.log("inputValues before navigation:", inputValues); // Debugging
        navigate("/Page2", { state: { inputValues } });
    };
    const firstColors = {
        'ทบ.': '#8B0000',
        'ทร.': '#003aff',
        'ทอ.': '#00c5ff',
        'ตร.': '#510808'
    };

    const selectedfirstColor = firstColors[inputValues.Service] || "#510808";

    const handleLocationChange = ({ address, latlong }) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            Address: address || "", // ใช้ค่า address หรือ default เป็น "" 
            Latlong: latlong || { lat: 0, lng: 0 }, // ใช้ค่า latlong หรือ default { lat: 0, lng: 0 }
        }));
    };
    console.log("Input values before saving:", inputValues);


    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: '700px center',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: "'Kanit', sans-serif",
            position: 'relative',
            justifyContent: "flex-end",
            gap: "0.5rem",
            alignItems: "center",
            overflow: "hidden",
        }}>

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: selectedfirstColor,
                opacity: 0.8,
                zIndex: 0
            }} />

            {showWelcome ? (
                <div
                    style={{
                        zIndex: 1,
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '20vh',
                        opacity: fadeOut ? 0 : 1,
                        transition: 'opacity 2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        width: '300px',
                        padding: '20px',
                        gap: '30px',
                    }}
                >
                    <p style={{ textAlign: 'start', padding: 0, margin: 0 }}>สายสัมพันธ์...</p>
                    <p style={{ alignSelf: 'end', padding: 0, margin: 0 }}>ไม่มีวันเปลี่ยนแปลง</p>
                </div>
            ) : (
                <>
                    <div style={{
                        marginLeft: "3rem",
                        justifyContent: "left",
                        color: '#FFFFFF',
                        fontSize: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        maxWidth: "1000px",
                        width: "100%",
                        marginBottom: "10px",
                        zIndex: 1,
                        animation: 'fadeIn 2s forwards',
                    }}>
                        กรอกข้อมูล

                        <div style={{
                            width: '35px',
                            height: '35px',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                        }}>
                            <span style={{
                                color: selectedfirstColor,
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}>1</span>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100vw",
                            height: "70vh",
                            backgroundColor: "#ffffff",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            color: 'white',
                            overflow: 'scroll',
                            position: 'relative',
                            boxSizing: "border-box",
                            padding: "20px",
                            borderRadius: "30px 30px 0px 0px",
                            maxWidth: "1000px",
                            paddingTop: "40px",
                            paddingBottom: "70px",
                            zIndex: 1,
                            opacity: 0,
                            animation: 'fadeIn 2s forwards',
                        }}
                    >

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                                <div style={{
                                    color: selectedfirstColor,
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem",
                                }}>เหล่า</div>
                                <Select
                                    style={{ width: "100%" }}
                                    variant='filled'
                                    size='large'
                                    placeholder='เลือกเหล่า'
                                    value={inputValues.Service}
                                    onChange={(value) => setInputValues({ ...inputValues, Service: value })}
                                    options={[
                                        { value: 'ทบ.', label: 'ทบ.' },
                                        { value: 'ทร.', label: 'ทร.' },
                                        { value: 'ทอ.', label: 'ทอ.' },
                                        { value: 'ตร.', label: 'ตร.' },
                                    ]}
                                />
                            </div>

                            <div>
                                <div style={{
                                    color: selectedfirstColor,
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem"
                                }}>คำนำหน้า ชื่อ สกุล</div>
                                <Input
                                    variant='filled'
                                    placeholder='ร.ท.รักชาติ ยิ่งชีพ'
                                    value={inputValues.Name}
                                    onChange={(e) => handleInputChange(e, 'Name')}
                                    size='large'
                                />
                            </div>

                            <div>
                                <div style={{
                                    color: selectedfirstColor,
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem"
                                }}>ชื่อเล่น/ฉายา</div>
                                <Input
                                    variant='filled'
                                    placeholder='ปาล์ม'
                                    value={inputValues.Nickname}
                                    onChange={(e) => handleInputChange(e, 'Nickname')}
                                    size='large'
                                />
                            </div>

                            <div>
                                <div style={{
                                    color: selectedfirstColor,
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem"
                                }}>เบอร์โทร</div>
                                <Input
                                    variant='filled'
                                    type='number'
                                    placeholder='0957777777'
                                    value={inputValues.Tel}
                                    onChange={(e) => handleInputChange(e, 'Tel')}
                                    size='large'
                                />
                            </div>

                            <div>
                                <div style={{
                                    color: selectedfirstColor,
                                    fontSize: "1.2rem",
                                    marginBottom: "0.2rem"
                                }}>ที่อยู่</div>
                                {/* <Radio.Group
                                    onChange={(e) => setAddressOption(e.target.value)}
                                    value={addressOption}
                                    style={{ marginBottom: '0.5rem' }}
                                >
                                    <Radio value="A">Option A</Radio>
                                    <Radio value="B">Option B</Radio>
                                </Radio.Group> */}
                                {addressOption === 'A' ? (
                                    <>
                                    <Select
                                        placeholder='เลือกจังหวัด'
                                        style={{ width: '100%' }}
                                        value={inputValues.Address}
                                        onChange={(value) => {
                                            // ค้นหาพิกัดจากจังหวัดที่เลือก
                                            const selectedProvince = provincesData.find(province => province.name === value);

                                            // อัปเดต inputValues พร้อม Latlong
                                            setInputValues({
                                                ...inputValues,
                                                Address: value,
                                                Latlong: selectedProvince ? { lat: selectedProvince.lat, lng: selectedProvince.lng } : null
                                            });
                                        }}
                                        size='large'
                                    >
                                        {provincesData.map((province) => (
                                            <Select.Option key={province.name} value={province.name}>
                                                {province.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    </>
                                    

                                ) : (
                                    <>

                                        <CombinedLocationSearch onLocationChange={handleLocationChange}></CombinedLocationSearch>


                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{
                            alignSelf: "center",
                            marginTop: "20px",
                            borderRadius: "30px",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <button style={{
                                color: "#ffffff",
                                backgroundColor: selectedfirstColor,
                                borderRadius: "30px",
                                width: "90%",
                                alignSelf: "center",

                            }} onClick={handleNextClick}>ต่อไป</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Page1;
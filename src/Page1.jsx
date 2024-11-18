import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Radio, Typography } from 'antd';
import MapPicker from 'react-google-map-picker';
import bgImage from './assets/afaps48-bg.png';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const { TextArea } = Input;
const { Search } = Input;

const provinces = [
    'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 
    'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 
    'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 
    'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 
    'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 
    'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 
    'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 
    'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 
    'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระบุรี', 'สระแก้ว', 'สิงห์บุรี', 
    'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 
    'อ่างทอง', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี', 'อำนาจเจริญ'
];

const DefaultLocation = { lat: 13.736717, lng: 100.523186 }; // Bangkok
const DefaultZoom = 10;

function Page1({ inputValues, setInputValues }) {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true); 
    const [fadeOut, setFadeOut] = useState(false); 
    const [addressOption, setAddressOption] = useState('A'); 
    const [location, setLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const mapRef = useRef(null); 

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

    const handleChangeLocation = (lat, lng) => {
        setLocation({ lat, lng });
        setInputValues({ ...inputValues, Address: `${lat}, ${lng}` });
    };
    

    const handleChangeZoom = (newZoom) => setZoom(newZoom);

    const handleNextClick = () => navigate('/Page2', { state: { inputValues } });

    const firstColors = {
        'ทบ.': '#8B0000',
        'ทร.': '#003aff',
        'ทอ.': '#00c5ff',
        'ตร.': '#510808'
    };

    const selectedfirstColor = firstColors[inputValues.Service] || "#510808"; 

    const initializeAutocomplete = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                mapRef.current.input, 
                { types: ['geocode'] }
            );

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const { lat, lng } = place.geometry.location;
                    handleChangeLocation(lat(), lng());
                }
            });
        }
    };

    useEffect(() => initializeAutocomplete(), []);
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
                                <Radio.Group
                                    onChange={(e) => setAddressOption(e.target.value)}
                                    value={addressOption}
                                    style={{ marginBottom: '0.5rem' }}
                                >
                                    <Radio value="A">Option A</Radio>
                                    <Radio value="B">Option B</Radio>
                                </Radio.Group>
                                {addressOption === 'A' ? (
                                    <Select
                                        placeholder='เลือกจังหวัด'
                                        style={{ width: '100%' }}
                                        value={inputValues.Address}
                                        onChange={(value) => setInputValues({ ...inputValues, Address: value })}
                                        size='large'
                                    >
                                        {provinces.map(province => (
                                            <Select.Option key={province} value={province}>
                                                {province}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                ) : (
                                    <>
                                        <Typography></Typography>
                                        <Search 
                                            ref={mapRef}
                                            placeholder="ค้นหาสถานที่..."
                                            enterButton="ค้นหา"
                                            size="large"
                                            style={{ marginBottom: "20px" }}
                                        />
                                        <Googlemapreact>
                                            
                                        </Googlemapreact>
                                        <MapPicker 
                                            defaultLocation={DefaultLocation}
                                            zoom={zoom}
                                            mapTypeId="roadmap"
                                            style={{ height: '400px', width: '100%' }}
                                            onChangeLocation={handleChangeLocation} 
                                            onChangeZoom={handleChangeZoom}
                                            apiKey='AIzaSyDDvLgwZXq5b1KoaJxrCOLo-ah_2M5pH7Y'
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{
                            alignSelf: "center",
                            marginTop: "20px",
                            borderRadius: "30px",
                            width: "100%",
                            display:'flex',
                            justifyContent:'center'
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
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Share2, RefreshCcw, CheckCircle2 } from 'lucide-react';

type PersonalityType = 'minimalist' | 'classic' | 'creator' | 'guardian';

interface Option {
  text: string;
  type: PersonalityType;
}     

interface Question {
  id: number;  
  question: string;
  options: Option[];
}
           
interface PreQuizQuestion {
  id: number;
  question: string;
  choices: { text: string; type: PersonalityType }[];  
  feedbackText: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "วันหยุดพักผ่อนในฝันของคุณคือแบบไหน?",
    options: [
      { text: "จิบกาแฟเงียบๆ ในคาเฟ่มินิมอล", type: "minimalist" },
      { text: "พักผ่อนในบ้านพักตากอากาศสไตล์คลาสสิก", type: "classic" },
      { text: "เดินชมแกลเลอรี่ศิลปะหรือคาเฟ่ดีไซน์เก๋", type: "creator" },
      { text: "จัดปาร์ตี้บาร์บีคิวกับครอบครัวที่สวนหลังบ้าน", type: "guardian" }
    ]
  },
  {
    id: 2,
    question: "โทนสีที่คุณมักจะเลือกใช้ในห้องนอนคือ?",
    options: [
      { text: "ขาว ครีม เอิร์ธโทนสว่าง", type: "minimalist" },
      { text: "น้ำตาลอบอุ่น ทอง หรือสีไม้ธรรมชาติ", type: "classic" },
      { text: "ดำ เทาเข้ม หรือสีที่ตัดกันชัดเจน", type: "creator" },
      { text: "สีอะไรก็ได้ที่ดูสะอาดและสบายตา", type: "guardian" }
    ]
  },
  {
    id: 3,
    question: "เมื่อพูดถึง 'บ้าน' คุณให้ความสำคัญกับสิ่งไหนมากที่สุด?",
    options: [
      { text: "ความโปร่งโล่ง สบายตา ไม่รก", type: "minimalist" },
      { text: "ความอบอุ่นและเรื่องราวที่ซ่อนอยู่ในของตกแต่ง", type: "classic" },
      { text: "ดีไซน์ที่สะท้อนตัวตนและไม่ซ้ำใคร", type: "creator" },
      { text: "ความปลอดภัยและฟังก์ชันการใช้งานที่ตอบโจทย์", type: "guardian" }
    ]
  },
  {
    id: 4,
    question: "ไอเทมแต่งบ้านชิ้นไหนที่คุณขาดไม่ได้?",
    options: [
      { text: "แจกันเซรามิกรูปทรงเรียบง่าย", type: "minimalist" },
      { text: "โคมไฟวินเทจหรือพรมทอมือ", type: "classic" },
      { text: "รูปภาพ abstract หรืองานประติมากรรม", type: "creator" },
      { text: "กล่องเก็บของอเนกประสงค์ที่ซ่อนความรกได้มิดชิด", type: "guardian" }
    ]
  },
  {
    id: 5,
    question: "ถ้าต้องเลือกวัสดุหลักในบ้าน คุณจะเลือก?",
    options: [
      { text: "ไม้สีอ่อนหรือปูนเปลือยขัดมัน", type: "minimalist" },
      { text: "ไม้สักหรือวัสดุที่ดูมีราคาและคลาสสิก", type: "classic" },
      { text: "กระจก เหล็ก หรือวัสดุผิวด้าน", type: "creator" },
      { text: "วัสดุที่ทนทาน ทำความสะอาดง่าย กันรอยขีดข่วน", type: "guardian" }
    ]
  },
  {
    id: 6,
    question: "สไตล์การแต่งตัวของคุณในวันสบายๆ?",
    options: [
      { text: "เสื้อยืดสีพื้น กางเกงผ้าลินิน", type: "minimalist" },
      { text: "เสื้อเชิ้ตดูดี มีดีเทลคลาสสิก", type: "classic" },
      { text: "แฟชั่นนำเทรนด์ มีสไตล์ชัดเจน", type: "creator" },
      { text: "ชุดทะมัดทะแมง เน้นใส่สบายและคล่องตัว", type: "guardian" }
    ]
  },
  {
    id: 7,
    question: "กลิ่นหอมแบบไหนที่คุณอยากให้มีในบ้าน?",
    options: [
      { text: "กลิ่นชาขาวหรือคอตตอนสะอาดๆ", type: "minimalist" },
      { text: "กลิ่นไม้หอม วานิลลา หรือเครื่องเทศอ่อนๆ", type: "classic" },
      { text: "กลิ่นซิตรัสสดชื่น หรือกลิ่นน้ำหอมนิชแบรนด์", type: "creator" },
      { text: "กลิ่นยูคาลิปตัสหรือกลิ่นธรรมชาติที่ทำให้สดชื่น", type: "guardian" }
    ]
  },
  {
    id: 8,
    question: "เวลาเลือกซื้อของชิ้นใหญ่เข้าบ้าน คุณตัดสินใจจากอะไร?",
    options: [
      { text: "ดีไซน์ที่เรียบง่าย เข้าได้กับทุกอย่าง", type: "minimalist" },
      { text: "ความสวยงามเหนือกาลเวลา ใช้ได้นาน", type: "classic" },
      { text: "ความโดดเด่น เป็น statement piece ของบ้าน", type: "creator" },
      { text: "ความคุ้มค่า ทนทาน และรีวิวการใช้งานจริง", type: "guardian" }
    ]
  },
  {
    id: 9,
    question: "มุมโปรดในบ้านของคุณคือมุมไหน?",
    options: [
      { text: "มุมนั่งเล่นริมหน้าต่างที่มีแสงธรรมชาติ", type: "minimalist" },
      { text: "ห้องหนังสือหรือมุมจิบชาที่ดูอบอุ่น", type: "classic" },
      { text: "มุมทำงานหรือสตูดิโอส่วนตัวที่ตกแต่งอย่างดี", type: "creator" },
      { text: "ห้องครัวหรือพื้นที่ส่วนกลางที่ใช้งานได้จริง", type: "guardian" }
    ]
  },
  {
    id: 10,
    question: "คำจำกัดความของ 'ประตู' สำหรับคุณคืออะไร?",
    options: [
      { text: "เส้นสายที่เรียบง่าย เชื่อมต่อพื้นที่อย่างกลมกลืน", type: "minimalist" },
      { text: "ปราการที่ต้อนรับผู้มาเยือนด้วยความอบอุ่นและหรูหรา", type: "classic" },
      { text: "งานศิลปะชิ้นแรกที่ทุกคนต้องเห็นก่อนเข้าห้อง", type: "creator" },
      { text: "สิ่งที่ปกป้องคนในครอบครัวและทนทานต่อทุกสภาพอากาศ", type: "guardian" }
    ]
  }
];

const preQuizQuestions: PreQuizQuestion[] = [
  {
    id: 1,
    question: "ปกติคุณชอบแต่งบ้านโทนไหน?",
    choices: [
      { text: "ขาว / ครีม", type: "minimalist" },
      { text: "ไม้ / อบอุ่น", type: "classic" },
      { text: "ดำ / เทา", type: "creator" },
      { text: "สีอะไรก็ได้ ขอใช้งานดี", type: "guardian" },
    ],
    feedbackText: "เริ่มเห็นตัวตนคุณแล้วนะ",
  },
  {
    id: 2,
    question: "ถ้าต้องเลือก 1 คำที่เป็นตัวคุณ?",
    choices: [
      { text: "สงบ", type: "minimalist" },
      { text: "อบอุ่น", type: "classic" },
      { text: "โดดเด่น", type: "creator" },
      { text: "มั่นคง", type: "guardian" },
    ],
    feedbackText: "น่าสนใจเลย...",
  },
  {
    id: 3,
    question: "คุณชอบฟีลบ้านแบบไหน?",
    choices: [
      { text: "โปร่ง โล่ง สบาย", type: "minimalist" },
      { text: "คลาสสิก มีเรื่องราว", type: "classic" },
      { text: "เท่ ไม่ซ้ำใคร", type: "creator" },
      { text: "แข็งแรง ทนทาน", type: "guardian" },
    ],
    feedbackText: "แม่นมากเลย!",
  },
];

const personalities = {
  minimalist: {
    title: "The Calm Minimalist",
    subtitle: "เรียบง่าย สงบ และสมดุล",
    doorType: "Melamine",
    colorName: "Alpine White - Almond Ash",
    description: "คุณรักความสงบและพื้นที่ที่ดูโปร่งโล่งสบายตา คุณเชื่อว่า 'Less is More' ประตู Melamine เหมาะกับคุณที่สุด ลายไม้สวยหลากหลายโทน ผิวเรียบสะอาดตา น้ำหนักเบาเปิดปิดสะดวก ราคาคุ้มค่า ดูแลง่ายแค่เช็ดก็สะอาด เหมาะกับห้องนอน ห้องนั่งเล่น และพื้นที่ภายในบ้านที่เน้นความเรียบง่ายแต่มีสไตล์",
    color: "bg-stone-100",
    accent: "text-stone-600",
    image: "/Melamine/Alpine White-Almond Ash.png",
    products: ["MINI-01", "MINI-02"]
  },
  classic: {
    title: "The Warm Classic",
    subtitle: "อบอุ่น หรูหรา เหนือกาลเวลา",
    doorType: "WPC",
    colorName: "Latte Beige 1Line",
    description: "คุณหลงใหลในความงามที่ผ่านกาลเวลาและเรื่องราวที่ซ่อนอยู่ในรายละเอียด ประตู WPC คือคำตอบของคุณ ผิวลายไม้เหมือนจริงให้ฟีลธรรมชาติ กันปลวก 100% ทนน้ำไม่บวมไม่ผุ โครงสร้างแน่นหนักแข็งแรง ช่วยลดเสียงรบกวน สีไม้โทนอบอุ่นจะสร้างบรรยากาศต้อนรับที่หรูหราและเป็นกันเอง",
    color: "bg-amber-50",
    accent: "text-amber-700",
    image: "/WPC (2)/Latte Beige 1Line.png",
    products: ["CLAS-01", "CLAS-02"]
  },
  creator: {
    title: "The Modern Creator",
    subtitle: "โดดเด่น มีสไตล์ ไม่ซ้ำใคร",
    doorType: "Laminate",
    colorName: "Graphite Linen",
    description: "บ้านของคุณคือผืนผ้าใบที่สะท้อนความคิดสร้างสรรค์ ประตู Laminate คือ Statement Piece ที่ดึงดูดสายตา ทนรอยขีดข่วนสูงมาก สีไม่ซีดทน UV ดีไซน์พรีเมียมหลากหลายทั้งลายไม้ ลายหิน และสีโมเดิร์น ผิวสัมผัสมีให้เลือกทั้งด้านและเงา ลุคหรูระดับโรงแรมที่ตอบโจทย์ความชิคในตัวคุณ",
    color: "bg-slate-100",
    accent: "text-slate-800",
    image: "/Laminate/Graphite Linen.png",
    products: ["MOD-01", "MOD-02"]
  },
  guardian: {
    title: "The Practical Guardian",
    subtitle: "มั่นคง ปลอดภัย ตอบโจทย์การใช้งาน",
    doorType: "uPVC",
    colorName: "White 4Line",
    description: "คุณมองหาความคุ้มค่าและฟังก์ชันที่พึ่งพาได้ ประตู uPVC คือคำตอบสูงสุด กันน้ำ 100% ไม่บวมไม่พอง กันปลวกและแมลงกัดกิน ทนแดดทนฝนใช้ได้ทั้งภายในและภายนอก ไม่ต้องทาสีหรือเคลือบซ้ำ มีคุณสมบัติหน่วงไฟ ราคาคุ้มค่าอายุการใช้งานยาว เหมาะมากสำหรับห้องน้ำและพื้นที่เปียก",
    color: "bg-zinc-100",
    accent: "text-zinc-700",
    image: "/UPVC/White 4Line.png",
    products: ["PRAC-01", "PRAC-02"]
  }
};

const products = {
  // Melamine — minimalist
  "MINI-01": {
    name: "Alpine White",
    doorType: "Melamine",
    image: "/Melamine/Alpine White-1.png",
    tags: ["ลายเรียบสะอาดตา", "เช็ดทำความสะอาดง่าย", "ราคาคุ้มค่า"],
    reason: "สีขาวสะอาดตาที่เข้ากับทุกสไตล์ ผิวเรียบดูแลง่าย น้ำหนักเบา เหมาะกับห้องนอนและห้องนั่งเล่นที่เน้นความโปร่งโล่ง"
  },
  "MINI-02": {
    name: "Earl Grey",
    doorType: "Melamine",
    image: "/Melamine/Earl Grey-2.png",
    tags: ["โทนเทาอ่อน", "น้ำหนักเบา", "เหมาะงานภายใน"],
    reason: "โทนเทาอ่อนนุ่มนวลที่ให้ความรู้สึกสงบ ลายไม้สวยเป็นธรรมชาติ เข้ากับเฟอร์นิเจอร์สีอ่อนได้อย่างลงตัว"
  },
  // WPC — classic
  "CLAS-01": {
    name: "Latte Beige",
    doorType: "WPC",
    image: "/WPC (2)/Latte Beige.png",
    tags: ["ฟีลไม้ธรรมชาติ", "กันปลวก 100%", "ทนน้ำไม่บวม"],
    reason: "สีเบจอบอุ่นให้บรรยากาศต้อนรับ ผิวลายไม้เหมือนจริง กันปลวกและทนน้ำ โครงสร้างแน่นช่วยลดเสียงรบกวน"
  },
  "CLAS-02": {
    name: "Mocha Brown",
    doorType: "WPC",
    image: "/WPC (2)/Mocha Brown.png",
    tags: ["ลายไม้เหมือนจริง", "แข็งแรงลดเสียง", "คุ้มค่าระยะยาว"],
    reason: "สีน้ำตาลเข้มหรูหราเหนือกาลเวลา ไม่โก่งไม่บิดงอ ทำสีเพิ่มได้ เหมาะกับห้องนอนและห้องนั่งเล่นที่ต้องการความอบอุ่น"
  },
  // Laminate — creator
  "MOD-01": {
    name: "Graphite Linen",
    doorType: "Laminate",
    image: "/Laminate/Graphite Linen.png",
    tags: ["ทนรอยขีดข่วน", "ดีไซน์พรีเมียม", "ทนแสง UV"],
    reason: "โทนเทาเข้มดูหรูระดับโรงแรม ผิว Laminate ทนรอยขีดข่วนสูงมาก สีไม่ซีด มีคุณสมบัติหน่วงไฟ เหมาะกับคนที่ต้องการความโดดเด่น"
  },
  "MOD-02": {
    name: "Silvermist Oak",
    doorType: "Laminate",
    image: "/Laminate/Silvermist Oak.png",
    tags: ["ลุคพรีเมียม", "หน่วงไฟ", "เช็ดทำความสะอาดง่าย"],
    reason: "ลายไม้โทนเงินอมเทาที่ไม่ซ้ำใคร ผิวไม่ดูดซึมคราบ ทนความร้อน เหมาะกับบ้านระดับสูงและออฟฟิศที่ต้องการลุคพรีเมียม"
  },
  // uPVC — guardian
  "PRAC-01": {
    name: "White",
    doorType: "uPVC",
    image: "/UPVC/White.png",
    tags: ["กันน้ำ 100%", "กันปลวก", "ทนแดดทนฝน"],
    reason: "กันน้ำ 100% ไม่บวมไม่พอง กันปลวกและแมลง ทนแดดทนฝน ไม่ต้องทาสีซ้ำ เหมาะมากสำหรับห้องน้ำและพื้นที่เปียก"
  },
  "PRAC-02": {
    name: "White 5Line",
    doorType: "uPVC",
    image: "/UPVC/White 5Line.png",
    tags: ["หน่วงไฟ", "ปิดเงียบลดเสียง", "ราคาคุ้มค่า"],
    reason: "ดีไซน์เซาะร่อง 5 เส้นที่ดูทันสมัย มีคุณสมบัติหน่วงไฟ ปิดเงียบไม่มีเสียงเอี๊ยด อายุการใช้งานยาวไม่ต้องซ่อมบ่อย"
  }
};

const Home = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fefce8 30%, #fffbeb 60%, #fef3c7 100%)' }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-teal-100/30 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-1/4 left-8 w-12 h-20 rounded-lg border-2 border-amber-200/20 rotate-12 animate-float" />
        <div className="absolute top-1/3 right-12 w-10 h-16 rounded-lg border-2 border-teal-200/20 -rotate-6 animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-8 h-14 rounded-lg border-2 border-amber-200/15 rotate-3 animate-float" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-5 py-2 rounded-full bg-teal-50 border border-teal-200/50 mb-8 shadow-sm relative z-10"
      >
        <span className="text-xs font-semibold text-teal-600 tracking-widest uppercase">Interactive Quiz</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-5"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-800" style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}>
          ประตูแบบไหน
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mt-1 text-gray-800" style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}>
          คือ <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 bg-clip-text text-transparent">"ตัวคุณ"</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-gray-400 mb-12 max-w-md leading-relaxed text-base relative z-10"
      >
        ทำแบบทดสอบ 10 ข้อ แล้วค้นพบสไตล์ประตูที่เข้ากับตัวคุณมากที่สุด
      </motion.p>

      {/* Style preview cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-xl w-full relative z-10"
      >
        {[
          { emoji: '🤍', label: 'มินิมอล', gradient: 'from-sky-100/80 to-emerald-50/80', border: 'border-sky-200/50' },
          { emoji: '🪵', label: 'คลาสสิก', gradient: 'from-amber-100/80 to-orange-50/80', border: 'border-amber-200/50' },
          { emoji: '🖤', label: 'โมเดิร์น', gradient: 'from-slate-200/80 to-gray-50/80', border: 'border-slate-300/50' },
          { emoji: '🛡️', label: 'แข็งแรง', gradient: 'from-blue-100/80 to-cyan-50/80', border: 'border-blue-200/50' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 + idx * 0.08 }}
            className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-5 text-center border ${item.border} shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-default`}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <span className="text-xs font-semibold text-gray-700">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onStart}
        className="group relative z-10 inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base text-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 animate-pulse-glow"
        style={{ background: 'linear-gradient(135deg, #fde68a, #fbbf24, #f59e0b)' }}
      >
        เริ่มค้นหาสไตล์ของคุณ <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-xs text-gray-300 relative z-10"
      >
        ใช้เวลาไม่ถึง 2 นาที
      </motion.p>
    </motion.div>
  );
};

const roomTypes = [
  { id: 'bedroom', emoji: '🛏️', label: 'ห้องนอน', desc: 'ที่พักผ่อนส่วนตัว', color: '#6366f1', lightBg: '#eef2ff', ring: 'ring-indigo-200' },
  { id: 'bathroom', emoji: '🚿', label: 'ห้องน้ำ', desc: 'สดชื่นทุกวัน', color: '#06b6d4', lightBg: '#ecfeff', ring: 'ring-cyan-200' },
  { id: 'kitchen', emoji: '🍳', label: 'ห้องครัว', desc: 'หัวใจของบ้าน', color: '#f59e0b', lightBg: '#fffbeb', ring: 'ring-amber-200' },
  { id: 'living', emoji: '🛋️', label: 'ห้องรับแขก', desc: 'พื้นที่ต้อนรับ', color: '#10b981', lightBg: '#ecfdf5', ring: 'ring-emerald-200' },
  { id: 'office', emoji: '💼', label: 'ห้องทำงาน', desc: 'โฟกัสเต็มที่', color: '#8b5cf6', lightBg: '#f5f3ff', ring: 'ring-violet-200' },
  { id: 'entrance', emoji: '🚪', label: 'ประตูหน้าบ้าน', desc: 'ด่านแรกที่ใครก็เห็น', color: '#ec4899', lightBg: '#fdf2f8', ring: 'ring-pink-200' },
];

const PreQuiz = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'room' | 'hook' | 'questions' | 'curiosity'>('room');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleMiniAnswer = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQ < preQuizQuestions.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setPhase('curiosity');
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #f0fdfa 25%, #ecfdf5 50%, #fefce8 80%, #fff7ed 100%)' }}
    >
      <AnimatePresence mode="wait">
        {/* Phase 0: Room Selection */}
        {phase === 'room' && (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center px-5 py-12 relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-100/30 via-transparent to-amber-100/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            {/* Step badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mb-6 relative z-10"
            >
              <div className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                <span className="text-[11px] font-bold text-teal-600 tracking-widest uppercase">Step 1 / 3</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center mb-2 relative z-10"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                เลือกห้องที่อยากเปลี่ยน
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-gray-400 mb-10 relative z-10"
            >
              แตะห้องที่คุณอยากได้ประตูใหม่มากที่สุด
            </motion.p>

            {/* Room cards — 2 column layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3.5 w-full max-w-sm relative z-10"
            >
              {roomTypes.map((room, idx) => (
                <motion.button
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + idx * 0.06, type: "spring", stiffness: 260, damping: 22 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedRoom(room.id);
                    setTimeout(() => setPhase('hook'), 400);
                  }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-xl hover:ring-2 ${room.ring} transition-all duration-300 cursor-pointer text-left`}
                >
                  {/* Icon circle */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: room.lightBg }}
                  >
                    <span className="text-[22px] leading-none">{room.emoji}</span>
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <span
                      className="text-sm font-bold text-gray-800 block"
                      style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
                    >
                      {room.label}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">{room.desc}</span>
                  </div>
                  {/* Arrow indicator */}
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 ml-auto shrink-0 group-hover:translate-x-0.5 transition-all" />
                </motion.button>
              ))}
            </motion.div>

            {/* Bottom hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-[11px] text-gray-300 relative z-10"
            >
              เลือกได้ 1 ห้อง
            </motion.p>
          </motion.div>
        )}

        {/* Phase 1: Opening Hook */}
        {phase === 'hook' && (
          <motion.div
            key="hook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 cursor-pointer relative overflow-hidden"
            onClick={() => setPhase('questions')}
          >
            {/* Animated background rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.06 }}
                transition={{ delay: 0.3, duration: 1.5 }}
                className="absolute w-[500px] h-[500px] rounded-full border-2 border-teal-400"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.04 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="absolute w-[700px] h-[700px] rounded-full border border-teal-300"
              />
            </div>

            <div className="text-center max-w-md relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-lg shadow-teal-200/40"
              >
                <span className="text-2xl">🚪</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-2xl md:text-3xl text-gray-500 leading-relaxed font-medium"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                คุณเคยคิดไหมว่า...
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-3xl md:text-4xl leading-relaxed font-bold mt-4 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                ประตูบ้านก็บอกตัวตน
                <br />ของคุณได้?
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-12 flex flex-col items-center gap-2 relative z-10"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-md"
              >
                <ArrowRight className="w-4 h-4 text-teal-500 rotate-90" />
              </motion.div>
              <span className="text-xs text-gray-300">แตะเพื่อไปต่อ</span>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 2: Mini Questions */}
        {phase === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -right-20 w-64 h-64 bg-teal-100/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl" />
            </div>

            {/* Mini progress indicator */}
            <div className="flex items-center gap-3 mb-12 relative z-10">
              {preQuizQuestions.map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`rounded-full transition-all duration-500 flex items-center justify-center ${
                      i < currentQ ? 'w-8 h-8 bg-gradient-to-r from-teal-400 to-emerald-400 shadow-md shadow-teal-300/40' :
                      i === currentQ ? 'w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-400/50 ring-4 ring-teal-100' :
                      'w-8 h-8 bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    {i < currentQ ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className={`text-xs font-bold ${i === currentQ ? 'text-white' : 'text-gray-400'}`}>{i + 1}</span>
                    )}
                  </div>
                  {i < preQuizQuestions.length - 1 && (
                    <div className={`w-8 h-0.5 rounded-full transition-all duration-500 ${i < currentQ ? 'bg-gradient-to-r from-teal-400 to-emerald-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!showFeedback ? (
                <motion.div
                  key={`q-${currentQ}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full max-w-md text-center relative z-10"
                >
                  {/* Question card */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl p-8 mb-8">
                    <h2
                      className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed"
                      style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
                    >
                      {preQuizQuestions[currentQ].question}
                    </h2>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {preQuizQuestions[currentQ].choices.map((choice, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08 }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleMiniAnswer}
                        className="px-7 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 text-sm font-semibold text-gray-600 hover:border-teal-400 hover:text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {choice.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`feedback-${currentQ}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-lg shadow-teal-200/30"
                  >
                    <CheckCircle2 className="w-7 h-7 text-teal-500" />
                  </motion.div>
                  <p
                    className="text-xl text-gray-700 font-bold"
                    style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
                  >
                    {preQuizQuestions[currentQ].feedbackText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Phase 3: Build Curiosity + CTA */}
        {phase === 'curiosity' && (
          <motion.div
            key="curiosity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
          >
            {/* Animated background glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse" />
            </motion.div>

            {/* Completion check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mb-8 shadow-xl shadow-teal-400/30 relative z-10"
            >
              <CheckCircle2 className="w-9 h-9 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mb-4 relative z-10"
            >
              <p
                className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                ถ้าแค่ 2–3 ข้อนี้ยังแม่นขนาดนี้...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center mb-14 relative z-10"
            >
              <p
                className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-bold"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                แล้วถ้าลองครบ <span className="bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">10 ข้อ</span>
                <br />
                จะชัดขนาดไหนนะ?
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              onClick={onComplete}
              className="group relative z-10 inline-flex items-center gap-3 px-12 py-4.5 rounded-full font-bold text-base text-white transition-all duration-300 shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40"
              style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6, #2dd4bf)' }}
            >
              เริ่มค้นหาประตูที่เป็นคุณ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-6 text-xs text-gray-300 relative z-10 flex items-center gap-2"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300" />
              10 ข้อ ใช้เวลาไม่ถึง 2 นาที
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300" />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Quiz = ({ onComplete }: { onComplete: (answers: PersonalityType[]) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<PersonalityType[]>([]);

  const handleSelect = (type: PersonalityType) => {
    const newAnswers = [...localAnswers, type];
    setLocalAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0fdfa 0%, #ecfdf5 30%, #f0f9ff 60%, #faf5ff 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between relative z-10">
        <span className="text-sm font-bold text-gray-800">{currentIndex + 1}<span className="text-gray-300 font-normal">/{questions.length}</span></span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < currentIndex ? 'w-4 bg-gradient-to-r from-teal-400 to-emerald-400' : i === currentIndex ? 'w-6 bg-gradient-to-r from-teal-500 to-emerald-500 shadow-sm shadow-teal-400/50' : 'w-2 bg-gray-200/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -200, rotate: -5 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Question card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/60">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)' }}>
                <span className="text-lg font-bold text-white">{currentIndex + 1}</span>
              </div>
              <h2
                className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-8"
                style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
              >
                {question.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.04 }}
                    onClick={() => handleSelect(option.type)}
                    className={`aspect-square rounded-[2rem] transition-all duration-300 group shadow-md hover:shadow-xl flex items-center justify-center p-5 hover:scale-[1.03] cursor-pointer border ${
                      idx === 0 ? 'bg-gradient-to-br from-sky-50 to-teal-50 border-sky-200/50 hover:from-sky-400 hover:to-teal-500 hover:border-sky-400' :
                      idx === 1 ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 hover:from-amber-400 hover:to-orange-500 hover:border-amber-400' :
                      idx === 2 ? 'bg-gradient-to-br from-slate-100 to-gray-50 border-slate-200/50 hover:from-slate-500 hover:to-gray-700 hover:border-slate-400' :
                      'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 hover:from-blue-400 hover:to-cyan-500 hover:border-blue-400'
                    }`}
                  >
                    <span className="text-xs text-gray-600 group-hover:text-white font-medium leading-relaxed text-center">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hint below card */}
            <p className="text-center text-xs text-gray-300 mt-4">เลือกคำตอบที่ใกล้เคียงกับตัวคุณมากที่สุด</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const personalityTraits: Record<PersonalityType, string[]> = {
  minimalist: ["เรียบง่าย", "สงบ", "สมดุล"],
  classic: ["อบอุ่น", "หรูหรา", "เหนือกาลเวลา"],
  creator: ["โดดเด่น", "มีสไตล์", "ไม่ซ้ำใคร"],
  guardian: ["มั่นคง", "ปลอดภัย", "ตอบโจทย์"],
};

const personalityQuotes: Record<PersonalityType, string> = {
  minimalist: '"น้อยแต่มาก คือทุกอย่างที่ต้องการ"',
  classic: '"ความงามที่แท้จริง ไม่มีวันเก่า"',
  creator: '"บ้านคือผืนผ้าใบของฉัน"',
  guardian: '"บ้านที่ดี คือบ้านที่ไว้ใจได้"',
};

const allPersonalityTypes: { type: PersonalityType; emoji: string; label: string }[] = [
  { type: 'minimalist', emoji: '🤍', label: 'มินิมอล' },
  { type: 'classic', emoji: '🪵', label: 'คลาสสิก' },
  { type: 'creator', emoji: '🖤', label: 'โมเดิร์น' },
  { type: 'guardian', emoji: '🛡️', label: 'แข็งแรง' },
];

const Result = ({ answers, onRestart }: { answers: PersonalityType[], onRestart: () => void }) => {
  const counts = answers.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const resultType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as PersonalityType;
  const personality = personalities[resultType];
  const traits = personalityTraits[resultType];
  const quote = personalityQuotes[resultType];

  const personalityGradients: Record<PersonalityType, string> = {
    minimalist: 'linear-gradient(160deg, #fafaf9 0%, #f5f5f4 30%, #fafaf9 60%, #f5f5f0 100%)',
    classic: 'linear-gradient(160deg, #fefce8 0%, #fef9c3 30%, #fffbeb 60%, #fef3c7 100%)',
    creator: 'linear-gradient(160deg, #fafafa 0%, #f5f5f5 30%, #fafafa 60%, #f0f0f0 100%)',
    guardian: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 30%, #ecfdf5 60%, #d1fae5 100%)',
  };

  const personalityAccents: Record<PersonalityType, { badge: string; button: string; glow: string; tagBg: string; tagText: string; separatorColor: string }> = {
    minimalist: { badge: 'linear-gradient(135deg, #a8a29e, #78716c)', button: 'linear-gradient(135deg, #78716c, #57534e)', glow: 'rgba(120, 113, 108, 0.3)', tagBg: 'bg-stone-100', tagText: 'text-stone-700', separatorColor: '#78716c' },
    classic: { badge: 'linear-gradient(135deg, #d97706, #ea580c)', button: 'linear-gradient(135deg, #d97706, #dc2626)', glow: 'rgba(217, 119, 6, 0.3)', tagBg: 'bg-amber-50', tagText: 'text-amber-700', separatorColor: '#d97706' },
    creator: { badge: 'linear-gradient(135deg, #475569, #1e293b)', button: 'linear-gradient(135deg, #475569, #334155)', glow: 'rgba(71, 85, 105, 0.3)', tagBg: 'bg-slate-100', tagText: 'text-slate-700', separatorColor: '#475569' },
    guardian: { badge: 'linear-gradient(135deg, #059669, #0d9488)', button: 'linear-gradient(135deg, #059669, #047857)', glow: 'rgba(5, 150, 105, 0.3)', tagBg: 'bg-emerald-50', tagText: 'text-emerald-700', separatorColor: '#059669' },
  };

  const accents = personalityAccents[resultType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
      style={{ background: personalityGradients[resultType] }}
    >
      {/* Dramatic reveal overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 origin-top"
        style={{ background: accents.badge }}
      />
      {/* Hero - centered single column */}
      <div className="pt-12 pb-8 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-medium tracking-widest uppercase text-gray-400 block mb-8"
        >
          Your Door Personality
        </motion.span>

        {/* Door type badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <span
            className="inline-block px-6 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg"
            style={{ background: accents.badge, boxShadow: `0 8px 25px ${accents.glow}` }}
          >
            {personality.doorType}
          </span>
        </motion.div>

        {/* Big door image with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[300px] mx-auto mb-10 relative"
        >
          <div
            className="absolute inset-0 blur-3xl opacity-40 rounded-full scale-75"
            style={{ background: accents.badge }}
          />
          <img
            src={personality.image}
            alt={personality.title}
            className="w-full drop-shadow-2xl relative z-10"
          />
          <p className="mt-4 text-sm text-gray-500 font-medium tracking-wide relative z-10">
            สี: {personality.colorName}
          </p>
        </motion.div>

        {/* Personality name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-2"
        >
          <h2 className="text-base text-gray-500 font-medium mb-2 tracking-wide">{personality.subtitle}</h2>
          <h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent"
            style={{
              fontFamily: 'Kanit, Noto Sans Thai, sans-serif',
              backgroundImage: accents.badge,
            }}
          >
            {personality.title}
          </h1>
        </motion.div>
      </div>

      {/* Description card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-lg mx-auto px-6"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 p-6 md:p-8 shadow-xl">
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            {personality.description}
          </p>

          {/* Traits row */}
          <div className="flex items-center justify-center gap-4 text-sm font-bold text-gray-700 mb-6">
            {traits.map((trait, idx) => (
              <React.Fragment key={trait}>
                <span>{trait}</span>
                {idx < traits.length - 1 && <span style={{ color: accents.separatorColor }}>+</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Quote */}
          <p className="text-center text-gray-400 text-sm italic">{quote}</p>
        </div>
      </motion.div>

      {/* Recommended products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-lg mx-auto px-6 mt-8"
      >
        <h3
          className="text-center text-lg font-bold text-gray-800 mb-4"
          style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
        >
          ประตูที่ใช่สำหรับคุณ
        </h3>

        <div className="space-y-4">
          {personality.products.map((productId, idx) => {
            const product = products[productId as keyof typeof products];
            return (
              <div
                key={productId}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                    <span
                      className="px-2 py-0.5 text-white text-[10px] font-bold rounded-md"
                      style={{ background: accents.badge }}
                    >
                      {product.doorType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.reason}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.tags.map(tag => (
                      <span key={tag} className={`px-2.5 py-0.5 ${accents.tagBg} ${accents.tagText} text-[10px] font-medium rounded-full`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* All personality types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-lg mx-auto px-6 mt-10"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 p-6 shadow-md">
          <h3
            className="text-center text-sm font-bold text-gray-700 mb-4"
            style={{ fontFamily: 'Kanit, Noto Sans Thai, sans-serif' }}
          >
            ประตูบุคลิกทั้ง 4 แบบ
          </h3>
          <div className="flex items-center justify-center gap-6">
            {allPersonalityTypes.map((p) => (
              <div
                key={p.type}
                className={`text-center ${p.type === resultType ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className="text-2xl mb-1">{p.emoji}</div>
                <span className="text-[10px] font-medium text-gray-500 block">{p.label}</span>
                <span className="text-[9px] text-gray-400 block">{personalities[p.type].title.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="max-w-lg mx-auto px-6 mt-8 pb-16">
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full py-3.5 bg-white/70 backdrop-blur-sm text-gray-600 rounded-full font-medium border border-white/60 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
          >
            <RefreshCcw className="w-4 h-4" /> ทำแบบทดสอบอีกครั้ง
          </button>
          <button className="w-full py-2 text-gray-400 text-sm font-medium flex items-center justify-center gap-2 hover:text-gray-600 transition-colors">
            <Share2 className="w-4 h-4" /> แชร์ผลลัพธ์
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<'home' | 'prequiz' | 'quiz' | 'result'>('home');
  const [answers, setAnswers] = useState<PersonalityType[]>([]);

  const handleStart = () => setScreen('prequiz');
  const handlePreQuizComplete = () => setScreen('quiz');
  const handleComplete = (result: PersonalityType[]) => {
    setAnswers(result);
    setScreen('result');
  };
  const handleRestart = () => {
    setAnswers([]);
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-teal-100">
      <AnimatePresence mode="wait">
        {screen === 'home' && <Home key="home" onStart={handleStart} />}
        {screen === 'prequiz' && <PreQuiz key="prequiz" onComplete={handlePreQuizComplete} />}
        {screen === 'quiz' && <Quiz key="quiz" onComplete={handleComplete} />}
        {screen === 'result' && <Result key="result" answers={answers} onRestart={handleRestart} />}
      </AnimatePresence>
    </div>
  );
}

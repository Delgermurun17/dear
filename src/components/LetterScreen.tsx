import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void
}

export default function LetterScreen({ onNext }: Props) {
  const [opened, setOpened] = useState(false)   


  return (
    <div
  style={{
    width: "100%",
    height: "100dvh",
    background: "#ffb8c1",

    display: "flex",
    justifyContent: "center",
    alignItems: opened ? "flex-start" : "center",

    overflowY: "auto",
    overflowX: "hidden",

    position: "relative",

    paddingTop: opened ? 40 : "env(safe-area-inset-top)",
    paddingBottom: 40,

    WebkitOverflowScrolling: "touch",
  }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              scale: 3,
              opacity: 0,
              transition: {
                duration: 1.3,
                ease: "easeInOut",
              },
            }}
            style={{
              width: 300,
              height: 210,
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => setOpened(true)}
          >
            <motion.div
              initial={false}
              animate={{
                rotateX: opened ? 180 : 0,
              }}
              transition={{ duration: 1 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderTop: "105px solid #ff6b8a",
                transformOrigin: "top",
                zIndex: 3,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#ff7f9a",
                borderRadius: 14,
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderBottom: "105px solid #ff90aa",
                zIndex: 2,
              }}
            />

<div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 55,
    height: 55,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 30%, #ffe7a3, #f4c542 45%, #c88a00 75%, #8a5b00 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
    boxShadow: `
      inset 0 2px 8px rgba(255,255,255,0.5),
      inset 0 -4px 10px rgba(0,0,0,0.35),
      0 5px 20px rgba(0,0,0,0.25)
    `,
  }}
>
  <img
    src="/image.svg" // Энд өөрийн PNG замаа тавина
    alt="stamp"
    style={{
      width: "70%",
      height: "70%",
      objectFit: "contain",

      // Алтан өнгө болгоно
      filter:
        "sepia(1) saturate(7) hue-rotate(-10deg) brightness(1.15) contrast(1.2) drop-shadow(0 0 4px rgba(255,215,0,.8))",

      // Дарсан мэт эффект
      opacity: 0.95,
    }}
  />
</div>

            <h2
              style={{
                position: "absolute",
                top: -70,
                width: "100%",
                textAlign: "center",
                color: "#8a4055",
                fontFamily: "cursive",
                fontSize: 32,
                margin: 0,
              }}
            >
            </h2>

            <p
              style={{
                position: "absolute",
                bottom: -50,
                width: "100%",
                textAlign: "center",
                color: "#8a4055",
                fontSize: 15,
              }}
            >
              Дугтуйн дээр дарж нээнэ үү...✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{
              opacity: 0,
              scale: 0.4,
              y: 100,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            style={{
width: "90%",
maxWidth: 380,

marginTop: 30,
marginBottom: 30,
              background: "#fffaf5",
              borderRadius: 24,
              padding: 30,
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  textAlign: "center",
                  color: "#d86c86",
                  marginBottom: 25,
                  fontSize: 34,
                }}
              >
                Төрсөн өдрийн мэнд хүргэе, хайрт минь❤️
              </h1>

              <p
                style={{
                  color: "#555",
                  lineHeight: 1.9,
                  fontSize: 17,
                  textAlign: "left",
                }}
              >
                Хайрдаа,
                <br />
                <br />
                  Чамтай учирснаас хойш миний өдөр бүр илүү утга учиртай, илүү аз жаргалтай болсон. Заримдаа би сэтгэлээ үгээр сайн илэрхийлж чаддаггүй ч чамайгаа ямар их хайрлаж, нандигнаж явдгийг мэдээсэй гэж хүсэж байна.
                <br />
                <br />
                  Чиний инээмсэглэл, аз жаргалын шалтгаан нь баймаар байна. Баяр баясалтай ч бай, жаргалтай ч бай, гунигтай эсвэл хэцүү мөчүүдэд ч би үргэлж чиний хажууд байж, чамайгаа хайрласаар байх болно.
                <br />
                <br />
                  Энэ хорвоод мэндэлсэнд чинь, бас миний амьдралд орж ирж намайг хайрлаж байгаад чинь баярлалаа. Чамтай хамт өнгөрөөх өдөр бүр миний хувьд хамгийн нандин бэлэг байх болно.
                <br />
                <br />
                  Төрсөн өдрийн мэнд хүргэе, миний гэрэл гэгээ минь. ❤️
              </p>
            </div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={onNext}
              style={{
                textAlign: "center",
                marginTop: 25,
                color: "#d86c86",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              Энд дараад үргжлүүлээрэй ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
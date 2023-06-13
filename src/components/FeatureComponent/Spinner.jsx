import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Loader = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function LoaderExample() {
  const [isLoading, setIsLoading] = useState(true);

 
  return (
    <Loader>
      {isLoading && (
        <>
          <span>Loading....</span>
          <br />
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["50% 50%", "2% 50%"],
              x: 75,
            }}
            initial={{
              x: -75,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            style={{
              height: "50px",
              background: "#0fbcf9",
              width: "50px",
              borderRadius: "2% 50%",
            }}
          ></motion.div>
        </>
      )}
    </Loader>
  );
}

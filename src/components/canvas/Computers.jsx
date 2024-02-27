import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'; 
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'; 

import CanvasLoader from '../Loader';

const Computer = ({ isMobile }) => {
  const { scene } = useGLTF('./desktop_pc/scene.gltf'); // Destructure scene directly

  useEffect(() => {
    console.log(scene); // Log the scene object to inspect it
  }, [scene]);

  return (
    <mesh>
      <hemisphereLight intensity={3.5} groundColor="black"/> 
      <pointLight intensity={10} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={scene}
        scale={isMobile ? 0.6 : 0.80}
        position={isMobile ? [0, -3, -2.0] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

const ComputersCanvas = () => {
  
  const { scene } = useGLTF('./desktop_pc/scene.gltf');

  
const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width : 500px)');

    setIsMobile(mediaQuery.matches);

    const handlMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handlMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handlMediaQueryChange)
    }
  }, [])
  
  

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}  
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2}
        />
        <Computer isMobile={isMobile} />
      </Suspense>
      
      <Preload all />
    </Canvas>
  );
} 

export default ComputersCanvas;

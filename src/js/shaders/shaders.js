export const vertexShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;

export const fragmentShader = `
    uniform vec3 color;
    uniform float alpha;

    void main() {
      gl_FragColor = vec4(color, alpha);
    }
`;
uniform sampler2D uTexture;
uniform float uRadius;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  float dist = length(vPosition.xy);
  float alpha = smoothstep(uRadius, uRadius - 0.9, dist);
  vec4 color = texture2D(uTexture, vUv);
  color.a *= alpha;
  gl_FragColor = color;
}
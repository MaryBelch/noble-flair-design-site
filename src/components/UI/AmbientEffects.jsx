import './AmbientEffects.css';

export default function AmbientEffects() {
  return (
    <>
      {/* Side fog / ambient glow */}
      <div className="ambient-fog ambient-fog--left" aria-hidden="true" />
      <div className="ambient-fog ambient-fog--right" aria-hidden="true" />

      {/* Floating gold particles */}
      <div className="ambient-particles" aria-hidden="true">
        <div className="ambient-particle" />
        <div className="ambient-particle" />
        <div className="ambient-particle" />
        <div className="ambient-particle" />
        <div className="ambient-particle" />
        <div className="ambient-particle" />
      </div>
    </>
  );
}

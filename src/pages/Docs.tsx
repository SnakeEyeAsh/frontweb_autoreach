export default function Docs() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Documentos</h1>
      </div>
      <div style={{ maxWidth: '600px' }}>
        <div className="card" style={{ padding: '48px 32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '40px', lineHeight: 1 }}>📄</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginBottom: '8px' }}>
              Próximamente
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              La gestión de documentos estará disponible en una próxima actualización.
              Aquí podrás gestionar permisos de circulación, seguros, ITV y más.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* eslint-disable */
export const BackgroundCanvas = ({ children }: { children?: any }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#588cf0',
        padding: '30px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        {children}
      </div>
    </div>
  )
}

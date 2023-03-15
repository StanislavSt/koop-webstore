/* eslint-disable */
export const ProfileContent = ({ image, title, author }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', marginTop: '5px', marginBottom: '5px' }}>
        <img
          style={{ objectFit: 'contain' }}
          alt="Vercel"
          height={550}
          src={image}
          width={450}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '48px',
          }}
        >
          <span
            style={{
              fontSize: '56px',
              color: '#222',
              paddingTop: '45px',
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 700,
              maxWidth: 620,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: '36px',
              color: '#222',
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {author}
          </span>
        </div>
      </div>
    </div>
  )
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Auth page</h1>
      {/* дочерняя или соседняя */}
      {children}
    </div>
  )
}

export default AuthLayout

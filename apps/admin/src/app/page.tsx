export default function AdminDashboard() {
    return (
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <p style={{ color: '#666', marginTop: '1rem' }}>
                seethru.media platform administration
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>

                {/* Moderation Queue */}
                <section style={{ padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                        Moderation Queue
                    </h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>pending items</p>
                    <a href="/moderation" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary)' }}>
                        View Queue →
                    </a>
                </section>

                {/* Transparency */}
                <section style={{ padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                        Piggy Bank
                    </h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0</p>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>current balance</p>
                    <a href="/transparency" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary)' }}>
                        View Finances →
                    </a>
                </section>

                {/* Users */}
                <section style={{ padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                        Users
                    </h2>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>registered</p>
                    <a href="/users" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary)' }}>
                        Manage Users →
                    </a>
                </section>

            </div>
        </main>
    );
}

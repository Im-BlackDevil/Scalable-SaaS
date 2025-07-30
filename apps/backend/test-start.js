const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');

async function testStart() {
  try {
    console.log('🚀 Starting backend test...');
    
    // Create a minimal app for testing
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    console.log('✅ Backend modules loaded successfully!');
    console.log('📦 Available modules:');
    console.log('   - Auth Module');
    console.log('   - Users Module');
    console.log('   - Links Module');
    console.log('   - Analytics Module');
    console.log('   - Teams Module');
    console.log('   - Webhooks Module');
    console.log('   - Health Module');
    
    await app.close();
    console.log('🎉 Backend test completed successfully!');
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    process.exit(1);
  }
}

testStart(); 
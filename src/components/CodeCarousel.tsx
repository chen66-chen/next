import React, { useState } from 'react';

// 定义代码示例数据
const codeExamples = [
  {
    id: 'python',
    title: 'Python',
    filename: 'main.py',
    language: 'python',
    description: '机器学习数据处理与模型训练',
    subtitle: '该代码实现了完整的机器学习流程，包括数据加载、特征工程、模型训练和评估。使用随机森林算法对数据进行分类，并采用标准的训练/测试集划分方法进行验证。',
    icon: '🐍',
    tags: [
      { text: '机器学习', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
      { text: '数据科学', bgColor: 'bg-green-50', textColor: 'text-green-600' }
    ],
    code: `# 导入必要的库
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 加载数据集
def load_data(file_path):
    """加载并预处理数据集"""
    print(f"正在加载数据: {file_path}")
    data = pd.read_csv(file_path)
    
    # 数据清洗
    data.dropna(inplace=True)
    return data

# 特征工程
def feature_engineering(data):
    """特征提取和转换"""
    # 特征提取
    X = data.drop('target', axis=1)
    y = data['target']
    
    # 特征标准化
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y

# 模型训练与评估
def train_model(X, y):
    """训练随机森林模型并评估性能"""
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 初始化并训练模型
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # 预测与评估
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    
    print(f"模型准确率: {accuracy:.4f}")
    print("分类报告:")
    print(report)
    
    return model

# 主函数
if __name__ == "__main__":
    # 数据加载与处理
    data = load_data("dataset.csv")
    X, y = feature_engineering(data)
    
    # 训练模型
    model = train_model(X, y)
    
    # 保存模型
    import joblib
    joblib.dump(model, "random_forest_model.pkl")
    print("模型已保存到 random_forest_model.pkl")`
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    filename: 'auth.js',
    language: 'javascript',
    description: 'JWT用户鉴权系统',
    subtitle: '该代码实现了一个基于JWT的用户认证系统，包括用户注册、登录功能，使用bcrypt进行密码加密，确保用户数据安全，适用于前后端分离的Web应用。',
    icon: '⚡',
    tags: [
      { text: 'Node.js', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
      { text: '安全', bgColor: 'bg-purple-50', textColor: 'text-purple-600' }
    ],
    code: `/**
 * 用户鉴权管理系统
 * 包含登录、注册、权限验证和令牌管理
 */

// 引入必要的依赖
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// 配置
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '24h';
const SALT_ROUNDS = 10;

// 用户数据存储 (实际应用中应使用数据库)
const userStore = new Map();

/**
 * 用户注册服务
 * @param {Object} userData - 用户注册信息
 * @returns {Object} - 包含用户ID和token的对象
 */
async function registerUser(userData) {
  // 参数验证
  if (!userData.username || !userData.password || !userData.email) {
    throw new Error('缺少必要的注册信息');
  }
  
  // 检查用户名是否已存在
  const existingUser = Array.from(userStore.values())
    .find(user => user.username === userData.username);
  
  if (existingUser) {
    throw new Error('用户名已存在');
  }
  
  // 密码哈希处理
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  
  // 创建新用户
  const userId = uuidv4();
  const newUser = {
    id: userId,
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date(),
    role: userData.role || 'user'
  };
  
  // 存储用户
  userStore.set(userId, newUser);
  
  // 生成JWT令牌
  const token = generateToken(newUser);
  
  // 返回用户ID和令牌
  return {
    userId,
    token
  };
}`
  },
  {
    id: 'java',
    title: 'Java',
    filename: 'OrderService.java',
    language: 'java',
    description: 'Spring微服务订单处理',
    subtitle: '该代码展示了Spring框架下的微服务订单系统实现，包括订单创建、产品库存检查和事务处理，采用了标准的分层架构设计模式，确保业务逻辑的可维护性和可扩展性。',
    icon: '☕',
    tags: [
      { text: 'Spring', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
      { text: '微服务', bgColor: 'bg-blue-50', textColor: 'text-blue-600' }
    ],
    code: `package com.example.ecommerce.service;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.exception.InsufficientStockException;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.dto.OrderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 订单服务实现类
 * 负责订单创建、查询、更新和取消等业务逻辑
 */
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final NotificationService notificationService;

    @Autowired
    public OrderServiceImpl(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.notificationService = notificationService;
    }

    /**
     * 创建新订单
     * @param orderDTO 订单数据传输对象
     * @return 创建的订单
     */
    @Override
    @Transactional
    public Order createOrder(OrderDTO orderDTO) {
        // 生成订单号
        String orderNumber = generateOrderNumber();
        
        // 创建订单实体
        Order order = new Order();
        order.setOrderNumber(orderNumber);
        order.setUserId(orderDTO.getUserId());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalAmount(0.0);
        
        // 处理订单项
        List<OrderItem> orderItems = orderDTO.getItems().stream()
            .map(itemDTO -> {
                // 查找产品
                Product product = productRepository.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + itemDTO.getProductId()));
                
                // 检查库存
                if (product.getStockQuantity() < itemDTO.getQuantity()) {
                    throw new InsufficientStockException(
                        "Insufficient stock for product: " + product.getName());
                }
                
                // 更新库存
                product.setStockQuantity(product.getStockQuantity() - itemDTO.getQuantity());
                productRepository.save(product);
                
                // 创建订单项
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProductId(product.getId());
                orderItem.setProductName(product.getName());
                orderItem.setQuantity(itemDTO.getQuantity());
                orderItem.setUnitPrice(product.getPrice());
                orderItem.setSubtotal(product.getPrice() * itemDTO.getQuantity());
                
                // 累加订单总金额
                order.setTotalAmount(order.getTotalAmount() + orderItem.getSubtotal());
                
                return orderItem;
            })
            .collect(Collectors.toList());
        
        order.setOrderItems(orderItems);
        
        // 保存订单
        Order savedOrder = orderRepository.save(order);
        
        // 发送订单确认通知
        notificationService.sendOrderConfirmation(savedOrder);
        
        return savedOrder;
    }
}`
  },
  {
    id: 'cpp',
    title: 'C++',
    filename: 'renderer.cpp',
    language: 'cpp',
    description: '图形渲染引擎',
    subtitle: '这是一个基于OpenGL的3D渲染引擎实现，负责场景的渲染和图形处理，包含着色器管理、纹理加载、相机控制和光照系统，适用于游戏开发和图形应用。',
    icon: '🔧',
    tags: [
      { text: '图形学', bgColor: 'bg-red-50', textColor: 'text-red-600' },
      { text: '游戏开发', bgColor: 'bg-blue-50', textColor: 'text-blue-600' }
    ],
    code: `#include "renderer.h"
#include "shader.h"
#include "texture.h"
#include "camera.h"
#include "mesh.h"
#include "light.h"

#include "glm/glm.hpp"
#include "glm/gtc/matrix_transform.hpp"
#include "glm/gtc/type_ptr.hpp"
#include "iostream"
#include "vector"

namespace Engine {

Renderer::Renderer() : 
    m_width(0), 
    m_height(0),
    m_clearColor(0.1f, 0.1f, 0.2f, 1.0f) {
    std::cout << "渲染引擎初始化..." << std::endl;
}

Renderer::~Renderer() {
    std::cout << "渲染引擎关闭..." << std::endl;
}

bool Renderer::Initialize(int width, int height) {
    m_width = width;
    m_height = height;
    
    // 初始化OpenGL上下文
    if (!InitializeOpenGL()) {
        std::cerr << "OpenGL初始化失败!" << std::endl;
        return false;
    }
    
    // 创建默认着色器
    if (!CreateDefaultShaders()) {
        std::cerr << "默认着色器创建失败!" << std::endl;
        return false;
    }
    
    // 设置深度测试
    glEnable(GL_DEPTH_TEST);
    // 设置背面剔除
    glEnable(GL_CULL_FACE);
    glCullFace(GL_BACK);
    
    std::cout << "渲染器初始化完成: " << width << "x" << height << std::endl;
    return true;
}

void Renderer::SetViewport(int width, int height) {
    m_width = width;
    m_height = height;
    glViewport(0, 0, width, height);
}

void Renderer::Clear() {
    glClearColor(m_clearColor.r, m_clearColor.g, m_clearColor.b, m_clearColor.a);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
}

void Renderer::Render(const Scene& scene, const Camera& camera) {
    Clear();
    
    // 获取相机视图和投影矩阵
    glm::mat4 viewMatrix = camera.GetViewMatrix();
    glm::mat4 projectionMatrix = camera.GetProjectionMatrix();
    
    // 渲染所有网格
    for (const auto& mesh : scene.GetMeshes()) {
        // 使用适当的着色器
        Shader* shader = mesh.GetMaterial().GetShader();
        shader->Use();
        
        // 设置变换矩阵
        glm::mat4 modelMatrix = mesh.GetTransform().GetMatrix();
        shader->SetMat4("model", modelMatrix);
        shader->SetMat4("view", viewMatrix);
        shader->SetMat4("projection", projectionMatrix);
        
        // 设置材质属性
        const Material& material = mesh.GetMaterial();
        shader->SetVec3("material.ambient", material.ambient);
        shader->SetVec3("material.diffuse", material.diffuse);
        shader->SetVec3("material.specular", material.specular);
        shader->SetFloat("material.shininess", material.shininess);
        
        // 设置纹理
        SetupTextures(shader, material);
        
        // 设置灯光
        SetupLights(shader, scene.GetLights(), viewMatrix);
        
        // 渲染网格
        mesh.Draw();
    }
}`
  }
];

// CodeCarousel组件定义
const CodeCarousel = () => {
  const [activeTab, setActiveTab] = useState('python');
  
  // 根据当前选中的tab返回对应的代码示例
  const activeExample = codeExamples.find(example => example.id === activeTab) || codeExamples[0];
  
  return (
    <div className="mb-12 overflow-hidden">
      <h2 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-2xl mb-6">代码精选</h2>
      
      {/* 代码轮播控制状态 */}
      <div className="code-carousel relative">
        {/* 轮播指示器和控制 */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            {codeExamples.map(example => (
              <button 
                key={example.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === example.id 
                    ? 'bg-site1-blue text-white' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(example.id)}
                aria-label={`显示${example.title}代码`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* 代码卡片容器 */}
        <div className="flex overflow-x-auto hide-scrollbar pb-4 snap-x">
          <div className="min-w-full px-2 snap-center">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              {/* 代码编辑器标题栏 */}
              <div className="bg-[#1e1e1e] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] mr-2"></div>
                  <span className="text-white text-xs ml-2 opacity-80">
                    {activeExample.description} - {activeExample.filename}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded text-xs bg-[#2d2d2d] text-white">
                    {activeExample.icon}
                  </span>
                </div>
              </div>
              
              {/* 代码内容 */}
              <div className="relative">
                <pre className="bg-[#1e1e1e] text-white p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                  <code className={`language-${activeExample.language}`}>
                    {activeExample.code}
                  </code>
                </pre>
                
                {/* 行号指示器 */}
                <div className="absolute left-0 top-0 p-4 text-gray-500 select-none">
                  {Array.from({ length: activeExample.code.split('\n').length }, (_, i) => (
                    <div key={i} className="leading-relaxed text-xs text-right pr-3 w-7">{i + 1}</div>
                  ))}
                </div>
              </div>
              
              {/* 代码描述 */}
              <div className="p-4 bg-white border-t border-gray-100">
                <h3 className="text-[#1a2b47] font-medium mb-2">{activeExample.description}</h3>
                <p className="text-sm text-[#516580]">
                  {activeExample.subtitle}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-xs text-gray-500">
                    {activeExample.tags.map((tag, index) => (
                      <span key={index} className={`px-2 py-1 ${tag.bgColor} ${tag.textColor} rounded-full ${index > 0 ? 'ml-2' : ''}`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <button className="text-xs flex items-center text-blue-600 hover:text-blue-700">
                    查看完整代码
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 左右切换按钮 */}
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 ml-2"
          onClick={() => {
            const currentIndex = codeExamples.findIndex(ex => ex.id === activeTab);
            const prevIndex = (currentIndex - 1 + codeExamples.length) % codeExamples.length;
            setActiveTab(codeExamples[prevIndex].id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 mr-2"
          onClick={() => {
            const currentIndex = codeExamples.findIndex(ex => ex.id === activeTab);
            const nextIndex = (currentIndex + 1) % codeExamples.length;
            setActiveTab(codeExamples[nextIndex].id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CodeCarousel; 